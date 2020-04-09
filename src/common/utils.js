import {Place} from '../common/consts.js';

const render = (container, template, place = Place.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getBoolean = () => Math.random() > 0.5;

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export {render, castTimeFormat, formatTime, getRandomArrayItem, getRandomIntegerNumber, getBoolean};
