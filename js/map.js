import {setActiveFormState, addressFieldElement} from './form-states.js';
import {similarCards, createHouseCapacityDescription, TYPES_OF_HOUSES, createHouseFeaturesList, createHousePhotos} from './similar-elements.js';

const mainMap = L.map('map-canvas').on('load', () => {
  setActiveFormState();
}).setView({
  lat: 35.6895,
  lng: 139.692,
}, 9);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mainMap);


const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor: [26, 52],
});


const mainMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon
  }
);

mainMarker.addTo(mainMap);

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressFieldElement.value = `${(coordinates.lat).toFixed(5)}, ${(coordinates.lng).toFixed(5)}`;
});


const similarMarkers = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createPopup = (cardItem) => {
  const templatePopupElement = document.querySelector('#card').content.querySelector('.popup');
  const popupItemElement = templatePopupElement.cloneNode(true);
  const offerType = cardItem.offer.type;

  popupItemElement.querySelector('.popup__avatar').src = cardItem.author.avatar;
  popupItemElement.querySelector('.popup__title').textContent = cardItem.offer.title;
  popupItemElement.querySelector('.popup__text--address').textContent = `Координаты ${cardItem.location.lat}, ${cardItem.location.lng}`;
  popupItemElement.querySelector('.popup__text--price').textContent = `${cardItem.offer.price}`;
  popupItemElement.querySelector('.popup__type').textContent = TYPES_OF_HOUSES[offerType];

  createHouseCapacityDescription(cardItem, popupItemElement);

  popupItemElement.querySelector('.popup__text--time').textContent = `Заезд после ${cardItem.offer.checkin}, выезд до ${cardItem.offer.checkout}`;

  createHouseFeaturesList(cardItem, popupItemElement);

  popupItemElement.querySelector('.popup__description').textContent = cardItem.offer.description;

  createHousePhotos(cardItem, popupItemElement);

  return popupItemElement;
};

const markerGroup = L.layerGroup().addTo(mainMap);

const createMarker = (pin) => {
  const {lat, lng} = pin.location;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    similarMarkers,
  }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createPopup(pin));

};

similarCards.forEach((point) => createMarker(point));

// markerGroup.clearLayers();

