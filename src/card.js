export function createPhotoItem(nameValue, link){
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