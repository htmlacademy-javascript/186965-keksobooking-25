import {priceForNightElement, typeOfFlatElement, minPriceForANight, pristine} from './form-validation.js';

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  }
});

sliderElement.noUiSlider.on('update', () => {
  priceForNightElement.value = sliderElement.noUiSlider.get();
});

typeOfFlatElement.addEventListener('change', (evt) => {
  let choosenTypeOfHouse = evt.target.value;
  const placeHolderPrice = minPriceForANight[choosenTypeOfHouse];

  for(choosenTypeOfHouse in minPriceForANight) {
    if(choosenTypeOfHouse) {
      sliderElement.noUiSlider.updateOptions({
        start: String(placeHolderPrice),
      });
    } else {
      sliderElement.noUiSlider.updateOptions ({
        start: 0,
      });
    }
  }

  pristine.validate(priceForNightElement);
});
