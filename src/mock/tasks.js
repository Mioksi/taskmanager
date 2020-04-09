import {COLORS, DAYS} from '../common/consts.js';
import {getRandomArrayItem, getRandomIntegerNumber, getBoolean} from '../common/utils.js';

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getBoolean() ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const getDay = (days, day) => Object.assign(days, {[day]: getBoolean()});

const generateRepeatingDays = () => DAYS.reduce(getDay, {});

const generateTask = () => {
  const dueDate = getBoolean() ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomArrayItem(COLORS),
    isArchive: getBoolean(),
    isFavorite: getBoolean(),
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};


export {generateTask, generateTasks};
