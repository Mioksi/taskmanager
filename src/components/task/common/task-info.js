import {COLORS} from '../../../common/consts';
import {formatTime, formatDate} from '../../../common/utils/helpers';
import {createColorsMarkup} from './colors';

const getExpireTask = (dueDate) => {
  const isExpired = dueDate instanceof Date && dueDate < Date.now();

  return isExpired ? `card--deadline` : ``;
};

const getDateTask = (dueDate) => {
  const isDateShowing = !!dueDate;

  const date = (isDateShowing && dueDate) ? formatDate(dueDate) : ``;
  const time = (isDateShowing && dueDate) ? formatTime(dueDate) : ``;

  return [date, time];
};

const getRepeatInfo = (repeatingDays) => {
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);

  return isRepeatingTask ? `card--repeat` : ``;
};

const getTaskInfo = (task) => {
  const {dueDate, color, repeatingDays} = task;

  const deadlineClass = getExpireTask(dueDate);
  const [date, time] = getDateTask(dueDate);
  const repeatClass = getRepeatInfo(repeatingDays);
  const colorsMarkup = createColorsMarkup(COLORS, color);

  return [date, time, repeatClass, deadlineClass, colorsMarkup];
};

export {getTaskInfo};
