import {createSorting} from './sorting.js';
import {createBoardTasks} from './board-tasks.js';
import {createLoadMoreButton} from './load-more-button.js';
import {createElement} from '../../common/utils';

const createBoard = () => (
  `<section class="board container">
    ${createSorting()}
    ${createBoardTasks()}
    ${createLoadMoreButton()}
  </section>`
);

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoard();
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
