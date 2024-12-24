import {enableValidation} from "./validate.js";
import {initialCards, validationSettings} from "./сonstants.js";
import {openModal, closeModal, setCloseEventListeners} from "./modal.js";
import {createCard} from "./card.js";

import '../pages/index.css';

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

setCloseEventListeners(closeButtons)


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

enableValidation(validationSettings);


for (let i = 0; i < initialCards.length; i++) {
    // отображаем на странице
    placesList.append(createCard(initialCards[i].name, initialCards[i].link, cardTemplate, imagePopup));
}
