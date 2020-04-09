import {createTask} from './task.js';
import {createSorting} from './sorting.js';
import {createBoardTasks} from './board-tasks.js';
import {createLoadMoreButton} from './load-more-button.js';

const createTaskList = (elements) => {
  let tasks = ``;

  elements.forEach((item) => {
    const task = createTask(item);

    tasks += task;
  });

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
