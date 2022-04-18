const DEFAULT_VALUE = 'any';
const OPTION_PRICE_HIGHT = 50000;
const OPTION_PRICE_LOW = 10000;
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

const filterType = (item) => typeOfHouseElement.value === DEFAULT_VALUE || typeOfHouseElement.value === item.offer.type;

const filterPrice = (item) =>  housePriceElement.value === DEFAULT_VALUE || (item.offer.price < `${OPTION_PRICE_LOW}` && housePriceElement.value === 'low') || (item.offer.price >= `${OPTION_PRICE_LOW}` && item.offer.price <= `${OPTION_PRICE_HIGHT}` && housePriceElement.value === 'middle') || (item.offer.price > `${OPTION_PRICE_HIGHT}` && housePriceElement.value === 'high');

const filterRooms = (item) => numberOfRoomsElement.value === DEFAULT_VALUE || +numberOfRoomsElement.value === item.offer.rooms;

const filterGuests = (item) => amountOfGuestElement.value === DEFAULT_VALUE || +amountOfGuestElement.value === item.offer.guests;


const filterFeatures = (item) => {
  const requiredFeatures = getAllCheckedCheckboxes();
  const itemFeatures = item.offer.features || [];

  for(const feature of requiredFeatures) {
    if(!itemFeatures.includes(feature.value)) {
      return false;
    }
  }

  return true;
};

const totalMatch = (data) => data.filter((item) => filterType(item) && filterPrice(item) && filterRooms(item) && filterGuests(item) && filterFeatures(item));


const filterChange = (cb) => {
  filterFormElement.addEventListener('change', () => {
    cb();
  });
};

export { filterChange, totalMatch, filterFormElement };
