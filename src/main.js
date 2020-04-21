import {TASK_COUNT} from "./common/consts";
import {render} from "./common/utils/render";
import {generateFilters} from './mock/filters.js';
import {generateTasks} from "./mock/tasks";
import {renderBoard} from "./components/board/utils/render-board";
import {renderTask} from './components/task/utils/render-task';
import MenuComponent from "./components/menu/menu";
import FiltersComponent from "./components/filter/filters";
import BoardComponent from "./components/board/board";

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const init = () => {
  const boardComponent = new BoardComponent(tasks);

  render(siteHeader, new MenuComponent());
  render(siteMain, new FiltersComponent(filters));
  render(siteMain, boardComponent);
  renderBoard(boardComponent, tasks, renderTask);
};

init();
