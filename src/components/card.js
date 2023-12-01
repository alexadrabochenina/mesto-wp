export function createPhotoItem(userId, cardObj, onPhotoClick, onLikeClick, onRemoveClick) {
    const photoTemplate = document.querySelector('#photo-template').content;
    const photoItemElement = photoTemplate.querySelector('.photo__item').cloneNode(true);
    const photoImageEl = photoItemElement.querySelector('.photo__item-picture');
    const likeBtn = photoItemElement.querySelector('.photo__item-info-button');
    const deleteBtn = photoItemElement.querySelector('.photo__item-info-delete');

    photoItemElement.id = cardObj._id;
    photoImageEl.addEventListener('click', () => onPhotoClick(cardObj.link, cardObj.name));
    likeBtn.addEventListener('click', () => onLikeClick(cardObj._id));
    deleteBtn.addEventListener('click', () => onRemoveClick(cardObj._id, photoItemElement));

    updateCardInternal(cardObj, photoItemElement, userId);

    return photoItemElement;
}

export function updateCard(cardObj, userId) {
    const cardEl = document.getElementById(cardObj._id);
    updateCardInternal(cardObj, cardEl, userId);
}

function updateCardInternal(cardObj, cardEl, userId) {
    const photoNameEl = cardEl.querySelector('.photo__item-info-text');
    const photoImageEl = cardEl.querySelector('.photo__item-picture');
    const photoLikesEl = cardEl.querySelector('.photo__item-info-number');
    const likeBtn = cardEl.querySelector('.photo__item-info-button');
    const deleteBtn = cardEl.querySelector('.photo__item-info-delete');

    photoImageEl.src = cardObj.link;
    photoImageEl.alt = cardObj.name;
    photoNameEl.textContent = cardObj.name;
    photoLikesEl.textContent = cardObj.likes.length;

    const liked = cardObj.likes.some(profile => profile._id == userId);
    if(liked) {
        likeBtn.classList.add('photo__item-info-button_active');
    } else {
        likeBtn.classList.remove('photo__item-info-button_active');
    } 

    if(cardObj.owner._id != userId) {
        deleteBtn.disabled = 'disabled';
        deleteBtn.classList.add('photo__item-info-delete_disabled');
    }
}