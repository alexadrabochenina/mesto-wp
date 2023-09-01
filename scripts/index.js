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

const likeBtn = document.querySelector('.photo__item-info-button');
const photo = document.querySelector('.photo');

const popupImage = document.querySelector('.popup_image');
const popupImagePhotoEl = popupImage.querySelector('.popup__photo');
const popupImageCaptionEl = popupImage.querySelector('.popup__caption');
const closeImagePopupBtn = popupImage.querySelector('.popup__close');

const initialCards = [
    {
       name: 'Сочи',
       link: 'images/Sochi.jpg'
    },
    {
        name: 'Крым',
        link: 'images/Cremia.jpg'
    },
    {
        name: 'Алтай',
        link: 'images/Altai.jpg'
    },
    {
        name: 'Байкал',
        link: 'images/Baikal.jpg'
    },
    {
        name: 'Дагестан',
        link: 'images/Dagestan.jpg'
    },
    {
        name: 'Кападокия',
        link: 'images/Capadokia.jpg'
    }
];

initialCards.forEach(function (item) {
    addPhoto(item.name, item.link)
});

function addPhoto(nameValue, link) {
    renderPhotoItem(createPhotoItem(nameValue, link));
}

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

function openEditPopup() {
    popupEditNameEl.value = titleEditEl.textContent;
    popupEditSubtitleEl.value = subtitleEditEl.textContent;
    validateForm(popupEdit);

    openPopup(popupEdit);
}

function submitEditPopup(event) {
    event.preventDefault();
    
    titleEditEl.textContent = popupEditNameEl.value;
    subtitleEditEl.textContent = popupEditSubtitleEl.value;
    
    closePopup(popupEdit);
}

function closePopupByEscape(event) {
    if (event.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
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
    toggleFormButton(popupAdd);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
}


openAddPopupBtn.addEventListener('click', openAddPopup);
closeAddPopupBtn.addEventListener('click', function() {
    closePopup(popupAdd);
});
popupAddForm.addEventListener('submit', submitAddPopup);
closeImagePopupBtn.addEventListener('click',function() {
    closePopup(popupImage);
});

popups.forEach((popup) => popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(popup)
    }
}));