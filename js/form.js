const mainFormElement = document.querySelector('.ad-form');
const formElements =mainFormElement.querySelectorAll('.ad-form__element');
const formFilterElement = document.querySelector('.map__filters');
const filterElements = formFilterElement.querySelectorAll('.map__filter');
const filterFeaturesElement = formFilterElement.querySelector('.map__features');

const setInactiveFormState = () => {
  mainFormElement.classList.add('ad-form--disabled');
  formFilterElement.classList.add('map__filters--disabled');
  filterFeaturesElement.setAttribute('disabled', 'disabled');

  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  filterElements.forEach((filter) => {
    filter.setAttribute('disabled', 'disabled');
  });
};


const setActiveFormState = () => {
  mainFormElement.classList.remove('ad-form--disabled');
  formFilterElement.classList.remove('map__filters--disabled');
  filterFeaturesElement.removeAttribute('disabled', 'disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });

  filterElements.forEach((filter) => {
    filter.removeAttribute('disabled', 'disabled');
  });
};


export {setInactiveFormState, setActiveFormState};
