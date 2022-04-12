// Random number
const getRandomNumber = (min, max) => {
  if(min >= max  || min < 0 || max < 0) {
    throw 'Error';
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Random floating point number
const getRandomCoordinate = (min, max, number) => {
  if(min >= max  || min < 0 || max < 0) {
    throw 'Error';
  }

  min = Math.floor(min);
  max = Math.floor(max);
  const randomNumber = Math.random() * (max - min + 1) + min;

  return +randomNumber.toFixed(number);
};


const inflectWord = (number, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};


const setHidden = (element) => {
  element.classList.add('hidden');
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 6000);
};


export {getRandomArrayElement, getRandomNumber, getRandomCoordinate, inflectWord, setHidden, showAlert};
