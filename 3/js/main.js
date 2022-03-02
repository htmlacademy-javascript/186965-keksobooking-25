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
  const randomNumber = Math.random() * (max - min + 1) + min; // Максимум и минимум включаются

  return +randomNumber.toFixed(number);
};

const titlesArray = ['Вашему вниманию предлагается просторная квартира', 'Сдается полностью укомплектованная, уютная, квартира', 'Сдам уютную квартиру на длительный срок от собственника', 'Сдается квартира. Полностью меблированная', 'Сдаётся от собственника без комиссии на длительный срок уютная, светлая квартира', 'Сдаётся отличная квартира, после ремонта', 'Сдаётся жилье, ранее жил сам собственник', 'Сдаётся на длительный срок прекрасная квартира', 'Предлагается в аренду квартира', 'Сдаётся просторная квартира в новом жилом комплексе'];
const HOUSES_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CARDS_AMOUNT = 10;
const CHECKIN_TIME = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
const HOUSES_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const HOUSES_DESCRIPTION = [
  'Сдается просторная светлая квартира. В шаговой доступности расположены все основные достопримечательности. В радиусе 5 минут ходьбы расположена станция метро',
  'Сдается квартира от собственника с дизайнерским ремонтом. Дом класса - комфорт плюс. Закрытый уютный двор без машин!',
  'Сдаётся уютная студия в центре Санкт-Петербурга в шаговой доступности от метро. В квартире есть всё необходимое для жизни',
  'Светлая и уютная квартира',
  'Сдается квартира, хороший ремонт, уютно, после ремонта, с мебелью. Отдельный вход со двора. Строго, без кошек и маленьких детей.',
  'Сдаётся светлая квартира с евроремонтом, совмещённым санузлом и балконом. Окна выходят во двор. Дом находится в районе с развитой инфраструктурой.',
  'Двухкомнатная видовая квартира полностью меблированная, кроме одной комнаты, которую можно использовать под детскую/кабинет/гостевую. Окна квартиры и балкон с панорамным остеклением выходят на зелёный массив парка и красочные закаты.',
  'В квартире произведён евроремонт полгода назад. Полностью обставлена новой современной мебелью из ИКЕИ. Имеется застеклённая лоджия. Дом расположен в 300 метрах от метро.',
  'Сдается квартира студия в новом доме, от метро 10 мин транспортом. Для 1-2х граждан РФ.'];
const HOUSES_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const avatarsImages = [];
const similarCards = [];

const createAvatars  = (number) => {
  for(let i = 1; i <= number; i++) {
    if(i < number) {
      i = `0${i}`;
    }

    avatarsImages.push(`img/avatars/user${i}.png`);
  }
};

createAvatars(CARDS_AMOUNT);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const creatCard = () => {
  for(let i = 0; i < CARDS_AMOUNT; i++) {
    const lat = getRandomCoordinate(35.65, 35.7, getRandomNumber(1, 20));
    const lng = getRandomCoordinate(139.7, 139.8, getRandomNumber(1, 20));

    const newCard = {
      author: {
        avatar: `${avatarsImages[i]}`
      },
      offer: {
        title: getRandomArrayElement(titlesArray),
        address: `${lat}, ${lng}`,
        price: getRandomNumber(0, 3000),
        type: getRandomArrayElement(HOUSES_TYPES),
        rooms: getRandomNumber(1, 10),
        guests: getRandomNumber(1, 14),
        checkin: getRandomArrayElement(CHECKIN_TIME),
        checkout: getRandomArrayElement(CHECKOUT_TIME),
        features: HOUSES_FEATURES.slice(getRandomNumber(0, HOUSES_FEATURES.length - 1)),
        description: getRandomArrayElement(HOUSES_DESCRIPTION),
        photos: HOUSES_PHOTOS.slice(getRandomNumber(0, HOUSES_PHOTOS.length - 1))
      },
      location: {
        lat: `${lat}`,
        lng: `${lng}`
      }
    };

    similarCards.push(newCard);
  }
};

creatCard();
