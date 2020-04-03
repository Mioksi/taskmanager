import {Place} from '../common/consts.js';

export const render = (container, template, place = Place.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};
