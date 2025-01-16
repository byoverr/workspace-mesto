import {deleteCard, putCardLike, deleteCardLike} from "./api.js";
import {closeModal, openModal} from "./modal.js";

function createCard(card, userId) {
    const {name, link, likes, _id, owner} = card;

    const cardTemplate = document.querySelector('#card-template').content;
    const placeElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteCardPopup = document.querySelector('.popup_type_delete-card');
    const confirmButton = deleteCardPopup.querySelector('.popup__button');

    const cardTitle = placeElement.querySelector('.card__title');
    const cardImage = placeElement.querySelector('.card__image');
    const likeButton = placeElement.querySelector('.card__like-button');
    const likeCounter = placeElement.querySelector('.card__likes-count');
    const deleteButton = placeElement.querySelector('.card__delete-button');

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    // Установка начального состояния лайков
    updateCardLikes(likeButton, likeCounter, likes, userId);

    // Обработка клика по кнопке лайка
    likeButton.addEventListener('click', () => {
        const isLiked = likeButton.classList.contains('card__like-button_is-active');
        const toggleLike = isLiked ? deleteCardLike(_id) : putCardLike(_id);

        toggleLike
            .then(updatedCard => {
                updateCardLikes(likeButton, likeCounter, updatedCard.likes, userId);
            })
            .catch(err => console.error("Ошибка при изменении лайка:", err));
    });

    if (owner._id !== userId) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => {
            openModal(deleteCardPopup);
            const newConfirmHandler = (evt) => {
                evt.preventDefault();

                const originalText = confirmButton.textContent;
                confirmButton.textContent = "Удаление...";
                confirmButton.disabled = true;

                deleteCard(_id)
                    .then(() => {
                        deleteButton.closest('.card').remove();
                        closeModal(deleteCardPopup);
                    })
                    .catch(err => console.error("Ошибка при удалении карточки:", err))
                    .finally(() => {
                        confirmButton.textContent = originalText;
                        confirmButton.disabled = false;
                    });
            };

            confirmButton.removeEventListener('click', confirmButton._handler);
            confirmButton.addEventListener('click', newConfirmHandler, {once: true});
            confirmButton._handler = newConfirmHandler;
        });
    }

    // Открытие попапа с изображением
    cardImage.addEventListener('click', () => {
        const imageContent = document.querySelector('.popup__image');
        const captionContent = document.querySelector('.popup__caption');

        imageContent.src = link;
        imageContent.alt = name;
        captionContent.textContent = name;

        openModal(document.querySelector('.popup_type_image'));
    });

    return placeElement;
}

// Обновление состояния лайков карточки
function updateCardLikes(likeButton, likeCounter, likes, userId) {
    likeCounter.textContent = likes.length > 0 ? likes.length : '';
    if (likes.some(user => user._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    }
}

export {createCard};
