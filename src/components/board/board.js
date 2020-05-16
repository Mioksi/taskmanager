import {createBoardTasks} from './components/board-tasks.js';
import AbstractComponent from '../abstracts/abstract-component';

const createBoard = () => {
  return (
    `<section class="board container">
      ${createBoardTasks()}
    </section>`
  );
};

export default class Filters extends AbstractComponent {
  constructor(tasks) {
    super();

    this._tasks = tasks;
  }

  getTemplate() {
    return createBoard(this._tasks);
  }
}
