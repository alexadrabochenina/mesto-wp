import '../pages/index.css';
import { createPhotoItem, updateCard } from './card.js';
import { openPopup, closePopup, closeOnMouseDown } from './modal.js';
import { enableValidation, toggleFormButton, clearValidation } from './validation.js'
import { getProfileInfo, changeProfileInfo, getInitialCards, addCard, deleteCard, addLike, deleteLike, changeAvatar } from './api.js';

const popupEdit = document.querySelector('.popup_edit');
const popupEditForm = popupEdit.querySelector('.popup__info');
const popupEditNameEl = popupEdit.querySelector('.popup__input_text_name');
const popupEditSubtitleEl = popupEdit.querySelector('.popup__input_text_subtitle');
const closeEditPopupBtn = popupEdit.querySelector('.popup__close');
const titleEditEl = document.querySelector('.profile__info-title');
const subtitleEditEl = document.querySelector('.profile__info-subtitle');
const openEditPopupBtn = document.querySelector('.profile__edit');
const popups = Array.from(document.querySelectorAll('.popup'));
const userAvatarEl = document.querySelector('.profile__logo');
const submitEditButton = popupEdit.querySelector('.popup__submit');

const popupAdd = document.querySelector('.popup_add');
const popupAddForm = popupAdd.querySelector('.popup__info');
const popupAddNameEl = popupAdd.querySelector('.popup__input_text_place-name');
const popupAddLinkEl = popupAdd.querySelector('.popup__input_text_place-link');
const closeAddPopupBtn = popupAdd.querySelector('.popup__close');
const openAddPopupBtn = document.querySelector('.profile__add');

const popupImage = document.querySelector('.popup_image');
const popupImagePhotoEl = popupImage.querySelector('.popup__photo');
const popupImageCaptionEl = popupImage.querySelector('.popup__caption');
const closeImagePopupBtn = popupImage.querySelector('.popup__close');

const popupAvatar = document.querySelector('.popup_avatar');
const popupAvatarForm = popupAvatar.querySelector('.popup__info');
const popupAvatarPhoto = popupAvatar.querySelector('.popup__input_url_avatar');
const closeAvatarPopupBtn = popupAvatar.querySelector('.popup__close');
const openAvatarPopupBtn = document.querySelector('.profile__photo');
const submitAvatarButton = popupAvatar.querySelector('.popup__submit');
const avatarEl = document.querySelector('.profile__logo');

const photo = document.querySelector('.photo');
let myId = '';

const cards = {};

const validationConfig = {
    formSelector: '.popup__info', 
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

Promise.all([getProfileInfo(), getInitialCards()])
    .then(res => {
        const user = res[0];
        const cardsArray = res[1];

        myId = user._id;
        
        titleEditEl.textContent = user.name;
        subtitleEditEl.textContent = user.about;
        userAvatarEl.src = user.avatar;

        cardsArray.forEach(item => {
            cards[item._id] = item;
            addPhoto(item, openImagePopup, onLikeClick, onRemoveClick)
        });
    })
    .catch(err => console.error(err));

function renderPhotoItem(photoItem){
    photo.prepend(photoItem);
}

function addPhoto(cardObj, onPhotoClick, onLikeClick, onRemoveClick) {
    renderPhotoItem(createPhotoItem(myId, cardObj, onPhotoClick, onLikeClick, onRemoveClick));
}

function onLikeClick(cardId) {
    const card = cards[cardId];
    const liked = card.likes.some(profile => profile._id == myId);

    if(liked) {
        deleteLike(card._id).then((res) => {
            cards[res._id] = res;
            updateCard(res, myId);
        }).catch(err => console.error(err));
    } else {
        addLike(card._id).then((res) => {
            cards[res._id] = res;
            updateCard(res, myId);
        }).catch(err => console.error(err));
    }   
}

function onRemoveClick(cardId, photoEl) {
    deleteCard(cardId).then(() => {
        photo.removeChild(photoEl);
        delete cards[cardId];
    })
    .catch(err => console.error(err));
}

function openAvatarPopup() {
    popupAvatarPhoto.value = '';
    submitAvatarButton.textContent = 'Сохранить';
    clearValidation(popupAvatar, validationConfig);

    openPopup(popupAvatar);
}

function openImagePopup(link, nameValue) {
    popupImagePhotoEl.src = link;
    popupImageCaptionEl.textContent = nameValue; 
    popupImagePhotoEl.alt = nameValue;

    openPopup(popupImage);
}

function openEditPopup() {
    popupEditNameEl.value = titleEditEl.textContent;
    popupEditSubtitleEl.value = subtitleEditEl.textContent;
    submitEditButton.textContent = "Сохранить";

    clearValidation(popupEdit, validationConfig);
    openPopup(popupEdit);
}

function submitEditPopup(event) {
    event.preventDefault();
    submitEditButton.disabled = 'disabled';
    submitEditButton.classList.add(validationConfig.inactiveButtonClass);
    submitEditButton.textContent = "Сохранение..."

    changeProfileInfo(popupEditNameEl.value, popupEditSubtitleEl.value).then(profile => {
        titleEditEl.textContent = profile.name;
        subtitleEditEl.textContent = profile.about;
        closePopup(popupEdit);
    }).catch(err => console.error(err));
}

openEditPopupBtn.addEventListener('click', openEditPopup);
closeEditPopupBtn.addEventListener('click', function() {
    closePopup(popupEdit);
});
popupEditForm.addEventListener('submit', submitEditPopup);

closeImagePopupBtn.addEventListener('click',function() {
    closePopup(popupImage);
});

function openAddPopup() {
    popupAddNameEl.value = '';
    popupAddLinkEl.value = '';

    clearValidation(popupAdd, validationConfig);
    openPopup(popupAdd);
}

function submitAddPopup(event) {
    event.preventDefault();

    addCard(popupAddNameEl.value, popupAddLinkEl.value).then(res => {
        cards[res._id] = res;
        addPhoto(res, openImagePopup, onLikeClick, onRemoveClick);
        closePopup(popupAdd);

        popupAddNameEl.value = '';
        popupAddLinkEl.value = '';
    }).catch(err => console.error(err));
}

function submitAvatarPopup(event) {
    event.preventDefault();
    submitAvatarButton.disabled = 'disabled';
    submitAvatarButton.classList.add(validationConfig.inactiveButtonClass);
    submitAvatarButton.textContent = "Сохранение..."

    changeAvatar(popupAvatarPhoto.value).then(profile => {
        avatarEl.src = profile.avatar;
        closePopup(popupAvatar);
    }).catch(err => console.error(err));
}

openAddPopupBtn.addEventListener('click', openAddPopup);
closeAddPopupBtn.addEventListener('click', () => closePopup(popupAdd));
openAvatarPopupBtn.addEventListener('click', openAvatarPopup);
closeAvatarPopupBtn.addEventListener('click', () => closePopup(popupAvatar));
popupAvatarForm.addEventListener('submit', submitAvatarPopup);

popupAddForm.addEventListener('submit', submitAddPopup);
popups.forEach((popup) => closeOnMouseDown(popup));

enableValidation(validationConfig);
