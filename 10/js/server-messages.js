
import { isEscapeKey } from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorMessageBtnElement = errorTemplate.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const onEscKeydown = (message) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    message.remove();
  }
};

const onWindowEvent = (message) => {
  window.addEventListener('click', () => {
    message.remove();
  });
};

const showSuccessMessage = () => {
  document.body.append(successTemplate);

  document.addEventListener('keydown', onEscKeydown((successTemplate)));

  onWindowEvent(successTemplate);
};


const showErrorMessage = () => {
  document.body.append(errorTemplate);

  errorMessageBtnElement.addEventListener('click', () => {
    errorTemplate.remove();
  });

  document.addEventListener('keydown', onEscKeydown(errorTemplate));
  onWindowEvent(errorTemplate);
};


export {showErrorMessage, showSuccessMessage};
