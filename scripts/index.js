const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__info');
const titleEl = document.querySelector('.profile__info-title');
const subtitleEl = document.querySelector('.profile__info-subtitle');
const popupNameEl = document.querySelector('.popup__input_text_name');
const popupSubtitleEl = document.querySelector('.popup__input_text_subtitle');
const openPopupBtn = document.querySelector('.profile__edit');
const closePopupBtn = document.querySelector('.popup__close');

function openPopup() {
    popupNameEl.value = titleEl.textContent;
    popupSubtitleEl.value = subtitleEl.textContent;

    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');  
}

function submitPopup(event) {
    event.preventDefault();
    
    titleEl.textContent = popupNameEl.value;
    subtitleEl.textContent = popupSubtitleEl.value;
    
    closePopup();
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
popupForm.addEventListener('submit', submitPopup);