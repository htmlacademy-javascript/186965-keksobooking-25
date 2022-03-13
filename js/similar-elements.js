import { createCards } from './data.js';


const inflectWord = (number, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};


const TYPES_OF_HOUSES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const templateCard = document.querySelector('#card').content.querySelector('.popup');// шаблон карточки
const similarCarsList = document.querySelector('#map-canvas'); // куда вставлять карточки
const similarCards = createCards(); // массив сгенерированной информации для карточек
const similarListFragment = document.createDocumentFragment();

similarCards.forEach((card) => {
  const similarCard = templateCard.cloneNode(true);
  const offerType = card.offer.type;
  const popupFeaturesContainer = similarCard.querySelector('.popup__features');
  const popupFeaturesList = popupFeaturesContainer.querySelectorAll('.popup__feature');
  const roomsAmount = card.offer.rooms;
  const guestAmount = card.offer.guests;

  similarCard.querySelector('.popup__title').textContent = card.offer.title;
  similarCard.querySelector('.popup__text--address').textContent = card.offer.address;
  similarCard.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  similarCard.querySelector('.popup__type').textContent = TYPES_OF_HOUSES[offerType];

  similarCard.querySelector('.popup__text--capacity').textContent = `${roomsAmount} ${inflectWord(roomsAmount, ['комната', 'комнаты', 'комнат'])} для ${guestAmount} ${inflectWord(guestAmount, ['гостя', 'гостей', 'гостей'])}`;

  similarCard.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  popupFeaturesList.forEach((popupFeaturesListItem) => {
    const isNessary = card.offer.features.some((feature) => popupFeaturesListItem.classList.contains(`popup__feature--${feature}`));

    if(!isNessary) {
      popupFeaturesListItem.remove();
    }
  });

  similarCard.querySelector('.popup__description').textContent = card.offer.description;

  const photoContainer = similarCard.querySelector('.popup__photos');
  photoContainer.innerHTML = '';
  const photoBox = document.createDocumentFragment();

  for(let i = 0; i < card.offer.photos.length; i++) {
    const photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.setAttribute('width', '45');
    photo.setAttribute('height', '40');
    photo.setAttribute('alt', 'Фотография жилья');
    photo.setAttribute('src', card.offer.photos[i]);

    photoBox.append(photo);
  }

  photoContainer.append(photoBox);

  similarCard.querySelector('.popup__avatar').src = card.author.avatar;

  similarListFragment.append(similarCard);

});

similarCarsList.append(similarListFragment);

