import {createSorting} from '../sorting.js';
import {createBoardTasks} from './board-tasks.js';
import {createLoadMoreButton} from '../load-more-button.js';

const createBoard = () => (
  `<section class="board container">
    ${createSorting()}
    ${createBoardTasks()}
    ${createLoadMoreButton()}
  </section>`
);

export {createBoard};
