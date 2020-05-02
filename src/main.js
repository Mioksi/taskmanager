import {TASK_COUNT} from "./common/consts";
import {render} from "./common/utils/render";
import {generateFilters} from './mock/filters.js';
import {generateTasks} from "./mock/tasks";
import MenuComponent from "./components/menu/menu";
import FiltersComponent from "./components/filter/filters";
import BoardComponent from "./components/board/board";
import BoardController from './controllers/board';
import TasksModel from './models/tasks';

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const init = () => {
  const tasksModel = new TasksModel();

  tasksModel.setTasks(tasks);

  const boardComponent = new BoardComponent(tasks);
  const boardController = new BoardController(boardComponent, tasksModel);

  render(siteHeader, new MenuComponent());
  render(siteMain, new FiltersComponent(filters));
  render(siteMain, boardComponent);

  boardController.render();
};

init();
