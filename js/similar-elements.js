import { inflectWord, setHidden } from './util.js';


const TYPES_OF_HOUSES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


const createHouseCapacityDescription = (item, element) => {
  const roomsAmount = item.offer.rooms;
  const guestAmount = item.offer.guests;

  element.querySelector('.popup__text--capacity').textContent = `${roomsAmount} ${inflectWord(roomsAmount, ['комната', 'комнаты', 'комнат'])} для ${guestAmount} ${inflectWord(guestAmount, ['гостя', 'гостей', 'гостей'])}`;

};

const createHouseFeaturesList = (item, element) => {
  const popupFeatureContainerElement = element.querySelector('.popup__features');
  const popupFeaturesElements = popupFeatureContainerElement.querySelectorAll('.popup__feature');

  popupFeaturesElements.forEach((popupFeaturesListItem) => {
    const isNessary = item.offer.features.some((feature) => popupFeaturesListItem.classList.contains(`popup__feature--${feature}`));

    if (!isNessary) {
      popupFeaturesListItem.remove();
    }
  });
};


const createHousePhotos = (items, element) => {
  const photoContainerElement = element.querySelector('.popup__photos');
  photoContainerElement.innerHTML = '';
  const photoBoxElement = document.createDocumentFragment();

  items.offer.photos.forEach((item) => {
    const photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.setAttribute('width', '45');
    photo.setAttribute('height', '40');
    photo.setAttribute('alt', 'Фотография жилья');
    photo.setAttribute('src', item);

    photoBoxElement.append(photo);
  });

  photoContainerElement.append(photoBoxElement);
};


const createSimilarCards = (card) => {
  const templateCardElement = document.querySelector('#card').content.querySelector('.popup');

  const similarCardElement = templateCardElement.cloneNode(true);
  const offerType = card.offer.type;

  similarCardElement.querySelector('.popup__title').textContent = card.offer.title;
  similarCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  similarCardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  similarCardElement.querySelector('.popup__type').textContent = TYPES_OF_HOUSES[offerType];

  createHouseCapacityDescription(card, similarCardElement);

  similarCardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  if(card.offer.features === undefined) {
    setHidden(similarCardElement.querySelector('.popup__features'));
  } else {
    createHouseFeaturesList(card, similarCardElement);
  }

  similarCardElement.querySelector('.popup__description').textContent = card.offer.description;

  if(card.offer.photos === undefined) {
    setHidden(similarCardElement.querySelector('.popup__photos'));
  } else {
    createHousePhotos(card, similarCardElement);
  }

  similarCardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return similarCardElement;
};

export {createSimilarCards};
