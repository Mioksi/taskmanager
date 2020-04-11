import {createTask} from './task.js';

const createTaskList = (tasks) => tasks.reduce((result, task) => {
  result += createTask(task);
  return result;
}, ``);

export {createTaskList};
