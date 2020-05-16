import {FORMAT_DATE, FORMAT_TIME} from '../consts.js';
import moment from "moment";

export const formatTime = (date) => moment(date).format(FORMAT_TIME);
export const formatDate = (date) => moment(date).format(FORMAT_DATE);

export const isRepeating = (repeatingDays) => Object.values(repeatingDays).some(Boolean);

export const isOverdueDate = (dueDate, date) => dueDate < date && !isOneDay(date, dueDate);

export const isOneDay = (dateA, dateB) => {
  const firstDate = moment(dateA);
  const secondDate = moment(dateB);

  return firstDate.diff(secondDate, `days`) === 0 && dateA.getDate() === dateB.getDate();
};
