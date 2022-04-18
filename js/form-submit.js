import { mainFormElement, addressFieldElement } from './form-states.js';
import { CENTER_COORDINATES } from './util.js';
import { resetMapPin, addMarkers } from './map.js';
import { getData, sendData } from './fetch-api.js';
import { showErrorMessage, showSuccessMessage} from './server-messages.js';
import { pristine, priceForNightElement } from './form-validation.js';
import { sliderElement } from './price-slider.js';
import { filterFormElement  } from './filter.js';
import { avatarPreviewElement, newImage } from './avatar.js';

const AVATAR_DEFAULT_URL = 'img/muffin-grey.svg';
const submitBtn = mainFormElement.querySelector('.ad-form__submit');

const resetImages = () => {
  newImage.remove();
  avatarPreviewElement.src = `${AVATAR_DEFAULT_URL}`;
};

const resetSlider = () => {
  sliderElement.noUiSlider.set(priceForNightElement .placeholder);
  sliderElement.noUiSlider.reset();
};

const resetForm = () => {
  mainFormElement.reset();
  addressFieldElement.value = `${CENTER_COORDINATES.lat}, ${CENTER_COORDINATES.lng}`;
  priceForNightElement.value = 0;
};


const resetFormBtn = mainFormElement.querySelector('.ad-form__reset');

resetFormBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMapPin();
  filterFormElement.reset();
  resetSlider();
  resetImages();
  resetForm();
  getData(addMarkers, showErrorMessage);
});

const blockSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправляю...';
};

const unblockSubmitBtn = () => {
  submitBtn.disabled = false;
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
          resetSlider();
          filterFormElement.reset();
          resetImages();
          resetForm();
          getData(addMarkers, showErrorMessage);
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
