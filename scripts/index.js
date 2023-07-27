const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__info');
const titleEl = document.querySelector('.profile__info-title');
const subtitleEl = document.querySelector('.profile__info-subtitle');
const popupTitleEl = document.querySelector('.popup__title');
const popupSubtitleEl = document.querySelector('.popup__subtitle');
const openPopupBtn = document.querySelector('.profile__edit');

openPopupBtn.addEventListener('click', openPopup);
popupForm.addEventListener('reset', closePopup);
popupForm.addEventListener('submit', submitPopup);

function openPopup() {
    popupTitleEl.value = titleEl.textContent;
    popupSubtitleEl.value = subtitleEl.textContent;

    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');  
}

function submitPopup(event) {
    event.preventDefault();
    
    titleEl.textContent = popupTitleEl.value;
    subtitleEl.textContent = popupSubtitleEl.value;
    
    closePopup();
}