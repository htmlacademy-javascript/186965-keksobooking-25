import { mainFormElement, addressFieldElement } from './form-states.js';
import { CENTER_COORDINATES } from './util.js';
import { resetMapPin } from './map.js';
import { sendData } from './fetch-api.js';
import { showErrorMessage, showSuccessMessage} from './server-messages.js';
import { pristine, priceForNightElement } from './form-validation.js';
import { sliderElement } from './price-slider.js';


const submitBtn = mainFormElement.querySelector('.ad-form__submit');

const resetForm = () => {
  mainFormElement.reset();
  addressFieldElement.value = `${CENTER_COORDINATES.lat}, ${CENTER_COORDINATES.lng}`;
  priceForNightElement.value = 0;
};

const resetFormBtn = mainFormElement.querySelector('.ad-form__reset');

resetFormBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMapPin();
  resetForm();
});

const blockSubmitBtn = () => {
  submitBtn.disable = true;
  submitBtn.textContent = 'Отправляю...';
};

const unblockSubmitBtn = () => {
  submitBtn.disable = false;
  submitBtn.textContent = 'Опубликовать';
};

const setFormSubmit = () => {
  mainFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if(isValid) {
      blockSubmitBtn();
      sendData(
        () => {
          unblockSubmitBtn();
          showSuccessMessage();
          resetMapPin();
          sliderElement.noUiSlider.reset();
          resetForm();
        },
        () => {
          showErrorMessage();
          unblockSubmitBtn();
        },
        new FormData(evt.target),
      );
    }
  });
};

export { setFormSubmit };
