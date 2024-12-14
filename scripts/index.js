const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editprofileButton  = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');
const addCardButton = document.querySelector('.profile__add-button');


const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const profileFormElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const newCardName = document.querySelector('.popup__input_type_card-name');
const newCardLink = document.querySelector('.popup__input_type_url');


const popups = document.querySelectorAll('.popup');

// Добавляем модификатор для плавной анимации
popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
});

closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {

        const popup = button.closest('.popup');
        if (popup) {
            closeModal(popup);
        }
    });
});

editprofileButton.addEventListener('click', function () {
    openModal(profilePopup);
    fillProfileForm();
});

function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profilePopup);
    }

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', function () {
    openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const newCard = {
        name: newCardName.value,
        link: newCardLink.value
    };

    initialCards.unshift(newCard);

    placesList.prepend(createCard(newCard.name, newCard.link));

    closeModal(cardPopup);

    evt.target.reset();
}


cardPopup.addEventListener('submit', handleCardFormSubmit);

function createCard(name, link) {
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

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}



for (let i = 0; i < initialCards.length; i++) {
    // отображаем на странице
    placesList.append(createCard(initialCards[i].name, initialCards[i].link));
}
