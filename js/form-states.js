
import { sendData } from './fetch-api.js';
import { pristine } from './form-validation.js';
import { showErrorMessage, showSuccessMessage} from './server-messages.js';
// import { CENTER_COORDINATES, resetMapPin } from './map.js';

const mainFormElement = document.querySelector('.ad-form');
const formElements = mainFormElement.querySelectorAll('.ad-form__element');
const formAvatarElement = mainFormElement.querySelector('.ad-form-header__input');
const formFilterElement = document.querySelector('.map__filters');
const filterElements = formFilterElement.querySelectorAll('.map__filter');
const filterFeaturesElement = formFilterElement.querySelector('.map__features');
const addressFieldElement = mainFormElement.querySelector('#address');
const CENTER_COORDINATES = {
  lat: 35.6895,
  lng: 139.692
};

const setInactiveFormState = () => {
  mainFormElement.classList.add('ad-form--disabled');
  formFilterElement.classList.add('map__filters--disabled');
  formAvatarElement.disabled = true;
  filterFeaturesElement.disabled = true;

  formElements.forEach((element) => {
    element.disabled = true;
  });

  filterElements.forEach((filter) => {
    filter.disabled = true;
  });
};

const resetForm = () => {
  mainFormElement.reset();
  addressFieldElement.value = `${CENTER_COORDINATES.lat}, ${CENTER_COORDINATES.lng}`;
};


const setActiveFormState = () => {
  addressFieldElement.value = `${CENTER_COORDINATES.lat}, ${CENTER_COORDINATES.lng}`;
  mainFormElement.classList.remove('ad-form--disabled');
  formFilterElement.classList.remove('map__filters--disabled');
  formAvatarElement.disabled = false;
  filterFeaturesElement.disabled = false;

  formElements.forEach((element) => {
    element.disabled = false;
  });

  filterElements.forEach((filter) => {
    filter.disabled = false;
  });
};

const resetFormBtn = mainFormElement.querySelector('.ad-form__reset');

resetFormBtn.addEventListener('click', () => {
  resetMapPin();
  resetForm();
});

const setFormSubmit = () => {
  mainFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if(isValid) {

      sendData(
        () => {
          showSuccessMessage();
          resetMapPin();
          resetForm();
        },
        () => showErrorMessage(),
        new FormData(evt.target));
    }
  });
};

export {setInactiveFormState, setActiveFormState, mainFormElement, addressFieldElement, setFormSubmit};
