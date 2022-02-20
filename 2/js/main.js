function getRandomNumber(min, max) {
  if(min >= max  || min < 0 || max < 0) {
    return;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются. Resourse MDN
}

getRandomNumber(10, 137);


function getrandomCoordinate(min, max, number) {
  if(min >= max  || min < 0 || max < 0) {
    return;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.random() * (max - min + 1) + min; //Максимум и минимум включаются
  const coordinate = +randomNumber.toFixed(number);

  return  coordinate;
}


getrandomCoordinate(10, 100, 13);
