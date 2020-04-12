import {COLORS, DAYS} from '../common/consts.js';
import {getRandomNumber, getBoolean, getRandomDate} from '../common/utils.js';

const DESCRIPTIONS = [
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

const getDay = (days, day) => Object.assign(days, {[day]: getBoolean()});

const generateRepeatingDays = () => DAYS.reduce(getDay, {});

const isDueDate = (dueDate) => dueDate ? DefaultRepeatingDays : generateRepeatingDays();

const generateTask = () => {
  const dueDate = getBoolean() ? null : getRandomDate();

  return {
    description: DESCRIPTIONS[getRandomNumber(DESCRIPTIONS.length)],
    dueDate,
    repeatingDays: isDueDate(dueDate),
    color: COLORS[getRandomNumber(COLORS.length)],
    isArchive: getBoolean(),
    isFavorite: getBoolean(),
  };
};

const generateTasks = (count) => new Array(count).fill(``).map(generateTask);


export {generateTask, generateTasks};
