import {isOverdueDate, isRepeating, isOneDay} from './helpers';

export const getArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchive);
};

export const getNotArchiveTasks = (tasks) => {
  return tasks.filter((task) => !task.isArchive);
};

export const getFavoriteTasks = (tasks) => {
  return tasks.filter((task) => task.isFavorite);
};

const getOverdueTask = (task, date) => {
  const dueDate = task.dueDate;

  if (!dueDate) {
    return false;
  }

  return isOverdueDate(dueDate, date);
};

export const getOverdueTasks = (tasks, date) => tasks.filter((task) => getOverdueTask(task, date));

export const getRepeatingTasks = (tasks) => tasks.filter((task) => isRepeating(task.repeatingDays));

export const getTasksInOneDay = (tasks, date) => tasks.filter((task) => isOneDay(task.dueDate, date));

const filterTypes = {
  'all': (tasks) => getNotArchiveTasks(tasks),
  'overdue': (tasks, nowDate) => getOverdueTasks(getNotArchiveTasks(tasks), nowDate),
  'today': (tasks, nowDate) => getTasksInOneDay(getNotArchiveTasks(tasks), nowDate),
  'favorites': (tasks) => getFavoriteTasks(getNotArchiveTasks(tasks)),
  'repeating': (tasks) => getRepeatingTasks(getNotArchiveTasks(tasks)),
  'archive': (tasks) => getArchiveTasks(tasks)
};

export const getTasksByFilter = (tasks, filterType) => {
  const nowDate = new Date();

  return filterTypes[filterType](tasks, nowDate);
};
