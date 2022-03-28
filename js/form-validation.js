import {mainFormElement} from './form-states.js';

const rentalTitleElement = mainFormElement.querySelector('[name="title"]');
const rentalPriceElement = mainFormElement.querySelector('[name="price"]');
const roomNumberElement = mainFormElement.querySelector('#room_number');
const roomCapacityElement = mainFormElement.querySelector('#capacity');
const capacityOptionsElement = {
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

const validateTitle = (value) => value.length >= 30 && value.length <= 100;
const validatePrice = (price) => price.value <= 0;

pristine.addValidator(rentalTitleElement, validateTitle, 'Обязательное поле. От 30 до 100 символов.');
pristine.addValidator(rentalPriceElement, validatePrice, 'Обязательное поле');


const validateRoomsAndCapacity = () => capacityOptionsElement[roomNumberElement.value].includes(roomCapacityElement.value);

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


const validatePriceForANight = (value) => {
  const typeOfFlat = mainFormElement.querySelector('[name="type"]');
  return value.length && parseInt(value, 10) <= minPriceForANight[typeOfFlat.value];
};

const validatePriceTextError = () => {
  const typeOfFlat = mainFormElement.querySelector('[name="type"]');
  return `Минимальная цена за ночь ${minPriceForANight[typeOfFlat.value]}`;
};

const validatePriceChange = () => {
  const typeOfFlat = mainFormElement.querySelector('[name="type"]');
  priceForNightElement.placeholder = minPriceForANight[typeOfFlat.value];
  pristine.validate(priceForNightElement);
};

mainFormElement.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', validatePriceChange));

pristine.addValidator(priceForNightElement, validatePriceForANight, validatePriceTextError );

// Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля во втором выделяется соответствующее ему значение. Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.



mainFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


