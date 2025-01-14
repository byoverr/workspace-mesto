import {apiConfig} from "./constants.js";

// Обработка ответа сервера
function processingServerResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Метод инициализации карточек с сервера
function getInitialCards() {
    return fetch(`${apiConfig.link}cards`, {
        headers: apiConfig.headers
    })
        .then(processingServerResponse);
}

// Метод добавления новой карточки на сервер
function addNewCard({name, link}) {
    return fetch(`${apiConfig.link}cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({name, link}) // Передаем данные карточки
    })
        .then(processingServerResponse);
}

// Метод удаления карточки с сервера
function deleteCard(cardId) {
    return fetch(`${apiConfig.link}cards/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then(processingServerResponse);
}

// Метод получения данных пользователя с сервера
function getUserData() {
    return fetch(`${apiConfig.link}users/me`, {
        headers: apiConfig.headers
    })
        .then(processingServerResponse);
}

// Метод отправки данных пользователя на сервер
function sendUserData({username, description}) {
    return fetch(`${apiConfig.link}users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({name: username, about: description})
    })
        .then(processingServerResponse);
}

// Метод отправки данных о новом аватаре на сервер
function sendAvatarData({avatar}) {
    return fetch(`${apiConfig.link}users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({avatar}) // Передаем ссылку на аватар
    })
        .then(processingServerResponse);
}

// Метод отправки лайка на сервер
function putCardLike(cardId) {
    return fetch(`${apiConfig.link}cards/${cardId}/likes`, {
        method: 'PUT',
        headers: apiConfig.headers
    })
        .then(processingServerResponse);
}

// Метод удаления лайка с сервера
function deleteCardLike(cardId) {
    return fetch(`${apiConfig.link}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then(processingServerResponse);
}

// Экспорт функций
export {
    getInitialCards,
    addNewCard,
    deleteCard,
    getUserData,
    sendUserData,
    sendAvatarData,
    putCardLike,
    deleteCardLike
};
