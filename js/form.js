const mainForm = document.querySelector('.ad-form');
const formElements = mainForm.querySelectorAll('.ad-form__element');
const formFilter = document.querySelector('.map__filters');
const formFilterElements = formFilter.querySelectorAll('.map__filter');

const inactiveFormState = () => {
  mainForm.classList.add('ad-form--disabled');
  formFilter.classList.add('map__filters--disabled');

  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  formFilterElements.forEach((filter) => {
    filter.setAttribute('disabled', 'disabled');
  });
};


const activeFormState = () => {
  mainForm.classList.remove('ad-form--disabled');
  formFilter.classList.remove('map__filters--disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });

  formFilterElements.forEach((filter) => {
    filter.removeAttribute('disabled', 'disabled');
  });
};


export {inactiveFormState, activeFormState};
