import { mainFormElement } from './form-states.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const avatarInputElement = mainFormElement.querySelector('#avatar');
const avatarPreviewElement = mainFormElement.querySelector('.ad-form-header__preview img');
const housePhotoElement = mainFormElement.querySelector('#images');
const housePreviewElement = mainFormElement.querySelector('.ad-form__photo');


avatarInputElement.addEventListener('change', () => {
  const avatar = avatarInputElement.files[0];
  const avatarName = avatar.name.toLowerCase();

  const matches = FILE_TYPES.some((file) =>  avatarName.endsWith(file));

  if(matches) {
    avatarPreviewElement.src = URL.createObjectURL(avatar);
  }
});


housePhotoElement.addEventListener('change', () => {
  const photo = housePhotoElement.files[0];
  const photoName = photo.name.toLowerCase();

  const matches = FILE_TYPES.some((file) => photoName.endsWith(file));

  if(matches) {
    const newImage = document.createElement('img');
    newImage.style.width = '100%';
    newImage.style.height = '100%';
    newImage.src = URL.createObjectURL(photo);

    housePreviewElement.append(newImage);
  }
});
