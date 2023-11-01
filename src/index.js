import './pages/index.css';
import { addPhoto } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, toggleFormButton, validateForm } from './validation.js'
import { initialCards } from './cards.js';

const popupEdit = document.querySelector('.popup_edit');
const popupEditForm = popupEdit.querySelector('.popup__info');
const popupEditNameEl = popupEdit.querySelector('.popup__input_text_name');
const popupEditSubtitleEl = popupEdit.querySelector('.popup__input_text_subtitle');
const closeEditPopupBtn = popupEdit.querySelector('.popup__close');
const titleEditEl = document.querySelector('.profile__info-title');
const subtitleEditEl = document.querySelector('.profile__info-subtitle');
const openEditPopupBtn = document.querySelector('.profile__edit');
const popups = Array.from(document.querySelectorAll('.popup'));

const popupAdd = document.querySelector('.popup_add');
const popupAddForm = popupAdd.querySelector('.popup__info');
const popupAddNameEl = popupAdd.querySelector('.popup__input_text_place-name');
const popupAddLinkEl = popupAdd.querySelector('.popup__input_text_place-link');
const closeAddPopupBtn = popupAdd.querySelector('.popup__close');
const openAddPopupBtn = document.querySelector('.profile__add');

const validationConfig = {
    formSelector: '.popup__info', 
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

initialCards.forEach(function (item) {
    addPhoto(item.name, item.link)
});

function openEditPopup() {
    popupEditNameEl.value = titleEditEl.textContent;
    popupEditSubtitleEl.value = subtitleEditEl.textContent;
    validateForm(popupEdit, validationConfig);

    openPopup(popupEdit);
}

function submitEditPopup(event) {
    event.preventDefault();
    
    titleEditEl.textContent = popupEditNameEl.value;
    subtitleEditEl.textContent = popupEditSubtitleEl.value;
    
    closePopup(popupEdit);
}

openEditPopupBtn.addEventListener('click', openEditPopup);
closeEditPopupBtn.addEventListener('click', function() {
    closePopup(popupEdit);
});
popupEditForm.addEventListener('submit', submitEditPopup);

function openAddPopup() {
    openPopup(popupAdd);
}

function submitAddPopup(event) {
    event.preventDefault();
    addPhoto(popupAddNameEl.value, popupAddLinkEl.value);
    closePopup(popupAdd);

    popupAddNameEl.value = '';
    popupAddLinkEl.value = '';
    toggleFormButton(popupAdd, validationConfig);
}
openAddPopupBtn.addEventListener('click', openAddPopup);
closeAddPopupBtn.addEventListener('click', function() {
    closePopup(popupAdd);
});
popupAddForm.addEventListener('submit', submitAddPopup);

popups.forEach((popup) => popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(popup)
    }
}));

enableValidation(validationConfig);