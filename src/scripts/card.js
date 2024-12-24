import {openModal} from "./modal.js";

function createCard(name, link, cardTemplate, imagePopup) {
// клонируем содержимое тега template
    const placeElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = placeElement.querySelector('.card__image');
// наполняем содержимым
    cardImage.src = link;
    placeElement.querySelector('.card__title').textContent = name;

    const likeButton = placeElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    const deleteButton = placeElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        const card = deleteButton.closest('.card');
        if (card) {
            card.remove();
        }
    });
    const imageContent = imagePopup.querySelector('.popup__image');
    const captionContent = imagePopup.querySelector('.popup__caption');

    cardImage.addEventListener('click', () => {
        imageContent.src = link;
        imageContent.alt = "image";
        captionContent.textContent = name;
        openModal(imagePopup);
    })


    return placeElement;
}

export {createCard};