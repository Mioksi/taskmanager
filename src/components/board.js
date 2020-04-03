import {createSorting} from "./sorting.js";
import {createBoardTasks} from "./board-tasks.js";
import {createLoadMoreButton} from "./load-more-button.js";

export const createBoard = () => (
  `<section class="board container">
    ${createSorting()}
    ${createBoardTasks()}
    ${createLoadMoreButton()}
  </section>`
);
