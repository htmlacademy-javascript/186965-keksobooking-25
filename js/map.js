
import { createSimilarCards } from './similar-elements.js';
import { setActiveFormState, addressFieldElement, setInactiveFormState } from './form-states.js';
import { totalMatch } from './filter.js';


const MAP_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const SIMILAR_CARD_NUMBER = 10;
const CENTER_COORDINATES = {
  lat: 35.6895,
  lng: 139.692
};

setInactiveFormState();

const mainMap = L.map('map-canvas').on('load', () => {
  setActiveFormState();
}).setView({
  lat: CENTER_COORDINATES.lat,
  lng: CENTER_COORDINATES.lng,
}, 12);

L.tileLayer(
  `${MAP_URL}`,
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mainMap);


const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor: [26, 52],
});


const mainMarker = L.marker(
  {
    lat: CENTER_COORDINATES.lat,
    lng: CENTER_COORDINATES.lng,
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
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const markerGroup = L.layerGroup().addTo(mainMap);

const createMarker = (pin) => {
  const {lat, lng} = pin.location;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: similarMarkers,
  });

  marker
    .addTo(markerGroup)
    .bindPopup(createSimilarCards(pin));

};

const addMarkers = (data) => {
  markerGroup.clearLayers();
  const filteredData = totalMatch(data);

  filteredData.slice(0, SIMILAR_CARD_NUMBER).forEach((pin) => {
    createMarker(pin);
  });
};


const resetMapPin = () => {
  mainMarker.setLatLng({
    lat: CENTER_COORDINATES.lat,
    lng: CENTER_COORDINATES.lng
  });

  mainMap.closePopup();

  mainMap.setView({
    lat: CENTER_COORDINATES.lat,
    lng: CENTER_COORDINATES.lng,
  }, 12);

  markerGroup.clearLayers();

};


export {addMarkers, resetMapPin, markerGroup, createMarker };
