import './similar-elements.js';
import './form-validation.js';
import './price-slider.js';
import './fetch-api.js';
import { getData } from './fetch-api.js';
import { debounce, showAlert } from './util.js';
import './server-messages.js';
import { addMarkers } from './map.js';
import { setFormSubmit } from './form-submit.js';
import { filterChange } from './filter.js';
import { RENDER_DELAY } from './util.js';
import './form-states.js';
import './avatar.js';


getData((cards) => {
  addMarkers(cards);
  filterChange(debounce(
    () => addMarkers(cards),
    RENDER_DELAY,
  ));
},
showAlert
);


setFormSubmit();
