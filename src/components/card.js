export function createPhotoItem(nameValue, link, onPhotoClick, onLikeClick, onRemoveClick) {
    const photoTemplate = document.querySelector('#photo-template').content;
    const photoItemElement = photoTemplate.querySelector('.photo__item').cloneNode(true);
    const photoNameEl = photoItemElement.querySelector('.photo__item-info-text');
    const photoImageEl = photoItemElement.querySelector('.photo__item-picture');

    photoImageEl.src = link;
    photoNameEl.textContent = nameValue;
    photoImageEl.alt = nameValue;

    photoImageEl.addEventListener('click', () => onPhotoClick(link, nameValue));

    const likeBtn = photoItemElement.querySelector('.photo__item-info-button');
    likeBtn.addEventListener('click', () => onLikeClick(likeBtn));

    const deleteBtn = photoItemElement.querySelector('.photo__item-info-delete');
    deleteBtn.addEventListener('click', () => onRemoveClick(photoItemElement));

    return photoItemElement;
}