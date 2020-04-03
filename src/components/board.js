import {TASK_COUNT} from '../common/consts.js';
import {createTask} from './task.js';
import {createSorting} from './sorting.js';
import {createBoardTasks} from './board-tasks.js';
import {createLoadMoreButton} from './load-more-button.js';

export const createTaskList = () => {
  let tasks = ``;

  for (let i = 0; i < TASK_COUNT; i++) {
    const task = createTask();

    tasks += task;
  }

  return tasks;
};

export const createBoard = () => (
  `<section class="board container">
    ${createSorting()}
    ${createBoardTasks()}
    ${createLoadMoreButton()}
  </section>`
);
