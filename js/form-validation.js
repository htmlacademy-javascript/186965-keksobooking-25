import {mainFormElement} from './form-states.js';

const rentalTitleElement = mainFormElement.querySelector('[name="title"]');
const rentalPriceElement = mainFormElement.querySelector('[name="price"]');
const roomNumberElement = mainFormElement.querySelector('#room_number');
const roomCapacityElement = mainFormElement.querySelector('#capacity');
const capacityOptions = {
  '1': ['1'],
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100': ['0']
};


const pristine = new Pristine(mainFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;
const validatePrice = (price) => price.length > 0;

pristine.addValidator(rentalTitleElement, validateTitle, 'Обязательное поле. От 30 до 100 символов.');
pristine.addValidator(rentalPriceElement, validatePrice, 'Обязательное поле');


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


mainFormElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if(!isValid) {
    evt.preventDefault();
  }
});
