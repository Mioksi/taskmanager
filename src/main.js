import {createMenu} from './components/menu.js';
import {createFilterList} from './components/filter-list.js';
import {generateFilters} from './mock/filters.js';
import {createBoard} from './components/board.js';
import {render} from './common/utils.js';
import {tasks} from './components/board-tasks.js';
import {createTask} from './components/task.js';
import {SHOWING_TASKS} from './common/consts.js';

let showingTasksCount = SHOWING_TASKS;

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);

const filters = generateFilters();

const init = () => {
  render(siteHeader, createMenu());
  render(siteMain, createFilterList(filters));
  render(siteMain, createBoard());

  const loadMoreButton = siteMain.querySelector(`.load-more`);

  const onLoadMoreButtonClick = () => {
    const taskList = document.querySelector(`.board__tasks`);
    const prevTasksCount = showingTasksCount;

    showingTasksCount = showingTasksCount + SHOWING_TASKS;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => render(taskList, createTask(task)));

    if (showingTasksCount >= tasks.length) {
      loadMoreButton.remove();

      loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);
    }
  };

  loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
};

init();
