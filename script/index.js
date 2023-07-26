const popup = document.querySelector('.popup');
const titleEl = document.querySelector('.profile__info-title');
const subtitleEl = document.querySelector('.profile__info-subtitle');
const popupTitleEl = document.querySelector('.popup__title');
const popupSubtitleEl = document.querySelector('.popup__subtitle');
const openPopupBtn = document.querySelector('.profile__edit');
const closePopupBtn = document.querySelector('.popup__close');
const popupSaveBtn = document.querySelector('.popup__button');

openPopupBtn.addEventListener('click', function() {
    popupTitleEl.value = titleEl.innerHTML;
    popupSubtitleEl.value = subtitleEl.innerHTML;

    popup.classList.remove('popup_hidden');
});

closePopupBtn.addEventListener('click', function() {
    popup.classList.add('popup_hidden');
});

popupSaveBtn.addEventListener('click', function() {
    popup.classList.add('popup_hidden');

    titleEl.innerHTML = popupTitleEl.value;
    subtitleEl.innerHTML = popupSubtitleEl.value;
});