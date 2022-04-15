
import { markerGroup, createMarker } from './map.js';


const filterFormElement = document.querySelector('.map__filters');
const typeOfHouseElement = filterFormElement.querySelector('#housing-type');
const housePriceElement = filterFormElement.querySelector('#housing-price');
const numberOfRoomsElement = filterFormElement.querySelector('#housing-rooms');
const amountOfGuestElement = filterFormElement.querySelector('#housing-guests');

const filters = (data) => {
  data.filter((item) => {
    if (item.offer.type === typeOfHouseElement.value) {
      return item;
    }
  });

  data.filter((item) => {
    if(item.offer.price < 10000 && housePriceElement.value === 'low') {
      return item;
    } else  if(item.offer.price >= 10000 && item.offer.price <= 50000 && housePriceElement.value === 'middle') {
      return item;
    } else  if(item.offer.price > 50000 && housePriceElement.value === 'high') {
      return item;
    }
  });

  data.filter((item) => {
    if(item.offer.rooms === +numberOfRoomsElement.value) {
      return item;
    }
  });


  data.filter((item) => {
    if(item.offer.guests === +amountOfGuestElement.value) {
      return item;
    }
  });
};


const changeEvent = (data, cb) => {
  filterFormElement.addEventListener('change', () => {
    cb(filters(data));
  });
};

export { changeEvent, filters };







// массив.filter((item) => {
//   return (item подходит под условие1 && item подходит под условие2)
// })


// Массив — это данные, которые тебе прилетели с сервера. То есть информация по всем хатам

// А условия — это фильтры по всем всплывашкам (удобства там всякие, что ещё есть)