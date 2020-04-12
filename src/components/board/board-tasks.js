import {TASK_COUNT, START_SHOWING_TASKS} from '../../common/consts.js';
import {createTaskEdit} from '../tasks/task-edit.js';
import {createTaskList} from '../tasks/task-list.js';
import {generateTasks} from '../../mock/tasks.js';

const tasks = generateTasks(TASK_COUNT);
const tasksCopy = tasks.slice(1);

const createBoardTasks = () => {
  return `<div class="board__tasks">${createTaskEdit(tasks[0])} ${createTaskList(tasksCopy.splice(0, START_SHOWING_TASKS))}</div>`;
};

export {createBoardTasks, tasksCopy};
