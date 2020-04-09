import {TASK_COUNT} from '../common/consts.js';
import {createTaskEdit} from './task-edit.js';
import {createTaskList} from './board.js';
import {generateTasks} from '../mock/tasks.js';

const tasks = generateTasks(TASK_COUNT);

const createBoardTasks = () => `<div class="board__tasks">${createTaskEdit(tasks[0])} ${createTaskList(tasks.slice(1, 8))}</div>`;

export {createBoardTasks, tasks};
