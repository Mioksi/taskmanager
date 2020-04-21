import {Sign, MAX_HOURS, HOURS_FORMAT, MAX_DAYS, ESC_KEY} from '../consts.js';

export const isEscEvent = function (evt, action) {
  if (evt.key === ESC_KEY) {
    action();
  }
};

export const getRandomNumber = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getBoolean = () => Math.random() > 0.5;

export const castTimeFormat = (value) => {
  return value < MAX_HOURS ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % HOURS_FORMAT);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getBoolean() ? Sign.POSITIVE : Sign.NEGATIVE;
  const diffValue = sign * getRandomNumber(MAX_DAYS);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};
