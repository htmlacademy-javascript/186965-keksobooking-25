import './similar-elements.js';
import './form-validation.js';
import { setFormSubmit } from './form-states.js';
import './price-slider.js';
import './fetch-api.js';
import { getData, SIMILAR_CARD_NUMBER } from './fetch-api.js';
import { showAlert } from './util.js';
import './server-messages.js';
import { addMarkers } from './map.js';


getData((cards) => {
  addMarkers(cards.slice(0, SIMILAR_CARD_NUMBER));
},
showAlert
);


setFormSubmit();

