const errorTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorMessageBtnElement = errorTemplate.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);


const showErrorMessage = () => {
  document.body.append(errorTemplate);

  errorMessageBtnElement.addEventListener('click', () => {
    errorTemplate.remove();
  });

};

const showSuccessMessage = () => {
  document.body.append(successTemplate);

  setTimeout(() => {
    successTemplate.remove();
  }, 4000);
};


export {showErrorMessage, showSuccessMessage};
