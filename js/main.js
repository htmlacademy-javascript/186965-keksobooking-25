import './similar-elements.js';
import './form-validation.js';
import './price-slider.js';
import './fetch-api.js';
import { getData } from './fetch-api.js';
import { showAlert } from './util.js';
import './server-messages.js';
import { addMarkers } from './map.js';
import {setFormSubmit} from './form-submit.js';
import  {changeEvent, filters} from './filter.js';


getData((cards) => {
  addMarkers(cards);
  changeEvent(() => addMarkers(cards));
  // console.log(cards);
},
showAlert
);


setFormSubmit();

