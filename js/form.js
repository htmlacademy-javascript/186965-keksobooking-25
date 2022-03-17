const mainFormElement = document.querySelector('.ad-form');
const formElements = mainFormElement.querySelectorAll('.ad-form__element');
const formAvatarElement = mainFormElement.querySelector('.ad-form-header__input');
const formFilterElement = document.querySelector('.map__filters');
const filterElements = formFilterElement.querySelectorAll('.map__filter');
const filterFeaturesElement = formFilterElement.querySelector('.map__features');

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


const setActiveFormState = () => {
  mainFormElement.classList.remove('ad-form--disabled');
  formFilterElement.classList.remove('map__filters--disabled');
  filterFeaturesElement.disabled = false;

  formElements.forEach((element) => {
    element.disabled = false;
  });

  filterElements.forEach((filter) => {
    filter.disabled = false;
  });
};


export {setInactiveFormState, setActiveFormState};
