import {COLORS, DAYS, MONTHS} from '../../../common/consts';
import {formatTime} from '../../../common/utils/helpers';
import {createColorsMarkup} from './colors';
import {createRepeatingDaysMarkup} from './repeating-days';

const getExpireTask = (dueDate) => {
  const isExpired = dueDate instanceof Date && dueDate < Date.now();

  return isExpired ? `card--deadline` : ``;
};

const getDateTask = (dueDate) => {
  const isDateShowing = !!dueDate;
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTHS[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  return [isDateShowing, date, time];
};

const getRepeatInfo = (repeatingDays) => {
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;

  return [isRepeatingTask, repeatClass];
};

const getTaskInfo = (task) => {
  const {dueDate, color, repeatingDays} = task;

  const deadlineClass = getExpireTask(dueDate);
  const [isDateShowing, date, time] = getDateTask(dueDate);
  const [isRepeatingTask, repeatClass] = getRepeatInfo(repeatingDays);
  const colorsMarkup = createColorsMarkup(COLORS, color);
  const repeatingDaysMarkup = createRepeatingDaysMarkup(DAYS, repeatingDays);

  return [date, time, repeatClass, deadlineClass, isDateShowing, isRepeatingTask, colorsMarkup, repeatingDaysMarkup];
};

export {getTaskInfo};
