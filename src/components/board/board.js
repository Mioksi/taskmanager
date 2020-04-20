import {createSorting} from './components/sorting.js';
import {createBoardTasks} from './components/board-tasks.js';
import {createLoadMoreButton} from './components/load-more-button.js';
import {createElement} from '../../common/utils';

const createBoard = (tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);
  const boardContent = tasks.length === 0 || isAllTasksArchived ? createEmptyBoard() : createFullBoard();

  return (
    `<section class="board container">
      ${boardContent}
    </section>`
  );
};

const createEmptyBoard = () => `<p class="board__no-tasks">Click «ADD NEW TASK» in menu to create your first task</p>`;

const createFullBoard = () => `${createSorting()}${createBoardTasks()}${createLoadMoreButton()}`;

export default class Board {
  constructor(tasks) {
    this._element = null;
    this._tasks = tasks;
  }

  getTemplate() {
    return createBoard(this._tasks);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
