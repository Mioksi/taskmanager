import {createTask} from './task.js';
import {createSorting} from './sorting.js';
import {createBoardTasks} from './board-tasks.js';
import {createLoadMoreButton} from './load-more-button.js';

const createTaskList = (element, count) => {
  let tasks = ``;

  for (let i = 0; i < count; i++) {
    const task = createTask(element[i]);

    tasks += task;
  }

  return tasks;
};

const createBoard = () => (
  `<section class="board container">
    ${createSorting()}
    ${createBoardTasks()}
    ${createLoadMoreButton()}
  </section>`
);

export {createTaskList, createBoard};
