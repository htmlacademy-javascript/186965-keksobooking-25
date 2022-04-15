
import { markerGroup, createMarker } from './map.js';

const DEFAULT_VALUE = 'any';
const filterFormElement = document.querySelector('.map__filters');
const typeOfHouseElement = filterFormElement.querySelector('#housing-type');
const housePriceElement = filterFormElement.querySelector('#housing-price');
const numberOfRoomsElement = filterFormElement.querySelector('#housing-rooms');
const amountOfGuestElement = filterFormElement.querySelector('#housing-guests');

const getAllCheckedCheckboxes = () => {
  const allCheckedCheckboxesArray = [];
  const checkboxesChecked = filterFormElement.querySelectorAll('.map__checkbox:checked');

  checkboxesChecked.forEach((item) => {
    allCheckedCheckboxesArray.push(item);
  });

  return allCheckedCheckboxesArray;
};

const filterType = (data) => {
  data.filter((item) => typeOfHouseElement.value === DEFAULT_VALUE || typeOfHouseElement.value === item.offer.type);
};

const filterPrice = (data) => {
  data.filter((item) => housePriceElement.value === DEFAULT_VALUE || (item.offer.price < 10000 && housePriceElement.value === 'low') && (item.offer.price >= 10000 && item.offer.price <= 50000 && housePriceElement.value === 'middle') && (item.offer.price > 50000 && housePriceElement.value === 'high'));
};

const filterRooms = (data) => {
  data.filter((item) => numberOfRoomsElement.value === DEFAULT_VALUE || +numberOfRoomsElement.value === item.offer.rooms);
};

const filterGuests = (data) => {
  data.filter((item) => amountOfGuestElement.value === DEFAULT_VALUE || +amountOfGuestElement.value === item.offer.guests);
};


const filterFeatures = (data) => {
  data.filter((item) => {
    if(item.offer.features) {
      const matchedFeatures = getAllCheckedCheckboxes().forEach((checkbox) => item.offer.features.includes(checkbox));
      return  matchedFeatures;
    }
  });
};

const totalMatch = (data) => filterType(data) && filterPrice(data) && filterRooms(data) && filterGuests(data) && filterFeatures(data);


const filterChange = (cb) => {
  filterFormElement.addEventListener('change', () => {
    cb();
  });
};
export { filterChange, totalMatch  };







// массив.filter((item) => {
//   return (item подходит под условие1 && item подходит под условие2)
// })


// Массив — это данные, которые тебе прилетели с сервера. То есть информация по всем хатам

// А условия — это фильтры по всем всплывашкам (удобства там всякие, что ещё есть)