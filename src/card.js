import { openPopup, closePopup } from './modal.js';

const photo = document.querySelector('.photo');

const popupImage = document.querySelector('.popup_image');
const popupImagePhotoEl = popupImage.querySelector('.popup__photo');
const popupImageCaptionEl = popupImage.querySelector('.popup__caption');
const closeImagePopupBtn = popupImage.querySelector('.popup__close');

closeImagePopupBtn.addEventListener('click',function() {
    closePopup(popupImage);
});

function createPhotoItem(nameValue, link){
    const photoTemplate = document.querySelector('#photo-template').content;
    const photoItemElement = photoTemplate.querySelector('.photo__item').cloneNode(true);
    const photoNameEl = photoItemElement.querySelector('.photo__item-info-text');
    const photoImageEl = photoItemElement.querySelector('.photo__item-picture');

    photoImageEl.src = link;
    photoNameEl.textContent = nameValue;
    
    photoImageEl.addEventListener('click', function(event) {
        popupImagePhotoEl.src = event.target.src;
        popupImageCaptionEl.textContent = photoNameEl.textContent;
        
        openPopup(popupImage);
    });

    const likeBtn = photoItemElement.querySelector('.photo__item-info-button');
    likeBtn.addEventListener('click', function(evt) {
        evt.target.classList.toggle('photo__item-info-button_active');
    });
    const deleteBtn = photoItemElement.querySelector('.photo__item-info-delete');
    deleteBtn.addEventListener('click', function() {
        photo.removeChild(photoItemElement);
    });

    return photoItemElement;
}

function renderPhotoItem(photoItem){
    photo.prepend(photoItem);
}

export function addPhoto(nameValue, link) {
    renderPhotoItem(createPhotoItem(nameValue, link));
}