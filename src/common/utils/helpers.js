import {Sign, MAX_DAYS, FORMAT_DATE, FORMAT_TIME} from '../consts.js';
import moment from "moment";

export const getRandomNumber = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getBoolean = () => Math.random() > 0.5;

export const formatTime = (date) => moment(date).format(FORMAT_TIME);
export const formatDate = (date) => moment(date).format(FORMAT_DATE);

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getBoolean() ? Sign.POSITIVE : Sign.NEGATIVE;
  const diffValue = sign * getRandomNumber(MAX_DAYS);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

export const isRepeating = (repeatingDays) => Object.values(repeatingDays).some(Boolean);

export const isOverdueDate = (dueDate, date) => dueDate < date && !isOneDay(date, dueDate);

export const isOneDay = (dateA, dateB) => {
  const firstDate = moment(dateA);
  const secondDate = moment(dateB);

  return firstDate.diff(secondDate, `days`) === 0 && dateA.getDate() === dateB.getDate();
};
