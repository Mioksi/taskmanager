import {createMenu} from './components/menu.js';
import {createFilterList} from './components/filter/filter-list.js';
import {generateFilters} from './mock/filters.js';
import {createBoard} from './components/board/board.js';
import {render} from './common/utils.js';
import {tasksCopy} from './components/board/board-tasks.js';
import {createTaskList} from './components/tasks/task-list.js';
import {SHOWING_TASKS} from './common/consts.js';

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);

const filters = generateFilters();

const init = () => {
  render(siteHeader, createMenu());
  render(siteMain, createFilterList(filters));
  render(siteMain, createBoard());

  const taskList = document.querySelector(`.board__tasks`);
  const loadMoreButton = siteMain.querySelector(`.load-more`);

  const onLoadMoreButtonClick = () => {
    render(taskList, createTaskList(tasksCopy.splice(0, SHOWING_TASKS)));

    if (tasksCopy.length === 0) {
      removeLoadMoreButton();
    }
  };

  const removeLoadMoreButton = () => {
    loadMoreButton.remove();

    loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);
  };

  loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
};

init();
