import { mainFormElement } from './form-states.js';

const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const rentalTitleElement = mainFormElement.querySelector('[name="title"]');
const roomNumberElement = mainFormElement.querySelector('#room_number');
const roomCapacityElement = mainFormElement.querySelector('#capacity');
const typeOfFlatElement = mainFormElement.querySelector('#type');
const capacityOptions = {
  '1': ['1'],
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100': ['0']
};

const priceForNightElement = mainFormElement.querySelector('#price');
const minPriceForANight = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000'
};


const pristine = new Pristine(mainFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const validateTitle = (value) => value.length >= `${MIN_LENGTH}` && value.length <= `${MAX_LENGTH}`;
const validatePrice = (price) => price.length >= 0;

pristine.addValidator(rentalTitleElement, validateTitle, 'Обязательное поле. От 30 до 100 символов.');
pristine.addValidator(priceForNightElement, validatePrice, 'Обязательное поле');


const validateRoomsAndCapacity = () => capacityOptions[roomNumberElement.value].includes(roomCapacityElement.value);

const roomsErrorMessage = () => {
  if(roomNumberElement.value === '1') {
    return `${roomNumberElement.value} комната только для 1 гостя`;
  }
  if (roomNumberElement.value === '2') {
    return `В ${roomNumberElement.value} комнаты не больше 2х гостей`;
  }
  if (roomNumberElement.value === '3') {
    return `В ${roomNumberElement.value} комнаты не больше 3х гостей`;
  }
  if (roomNumberElement.value === '100') {
    return `${roomNumberElement.value} комнат не для гостей`;
  }
};

pristine.addValidator(roomNumberElement, validateRoomsAndCapacity, roomsErrorMessage );
pristine.addValidator(roomCapacityElement, validateRoomsAndCapacity, roomsErrorMessage);


const validatePriceForANight = (value) => value.length && parseInt(value, 10) >= minPriceForANight[typeOfFlatElement.value];
const validatePriceTextError = () => `Минимальная цена за ночь ${minPriceForANight[typeOfFlatElement.value]}`;
const validatePriceChange = () => {
  priceForNightElement.placeholder = minPriceForANight[typeOfFlatElement.value];
  pristine.validate(priceForNightElement);
};


typeOfFlatElement.addEventListener('change', validatePriceChange);
pristine.addValidator(priceForNightElement, validatePriceForANight, validatePriceTextError);


const checkinElement = mainFormElement.querySelector('#timein');
const checkoutElement = mainFormElement.querySelector('#timeout');

const timeInAndTineOutOptions = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00'
};

const validateCheckInAndCheckOut = () => timeInAndTineOutOptions[checkinElement.value].includes(checkoutElement.value);


const validateChangeOfCheckin = () => {
  checkoutElement.value = timeInAndTineOutOptions[checkinElement.value];
  pristine.validate(checkoutElement);
};

const validateChangeOfCheckOut = () => {
  checkinElement.value = timeInAndTineOutOptions[checkoutElement.value];
  pristine.validate(checkinElement);
};

checkinElement.addEventListener('change', validateChangeOfCheckin);
checkoutElement.addEventListener('change', validateChangeOfCheckOut);

pristine.addValidator(checkinElement, validateCheckInAndCheckOut);
pristine.addValidator(checkoutElement, validateCheckInAndCheckOut);

export {priceForNightElement, typeOfFlatElement, minPriceForANight, pristine};
