import {TASK_COUNT} from "./common/consts";
import {render} from "./common/utils/render";
import {generateTasks} from "./mock/tasks";
import MenuComponent, {MenuItem} from "./components/menu/menu";
import BoardComponent from "./components/board/board";
import StatisticsComponent from './components/statistics/statistics';
import BoardController from './controllers/board';
import FilterController from './controllers/filter';
import TasksModel from './models/tasks';

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);

const dateTo = new Date();
const dateFrom = (() => {
  const date = new Date(dateTo);

  return date.setDate(date.getDate() - 7);
})();

const init = () => {
  const tasksModel = new TasksModel();

  tasksModel.setTasks(tasks);

  const boardComponent = new BoardComponent(tasks);
  const boardController = new BoardController(boardComponent, tasksModel);
  const filterController = new FilterController(siteMain, tasksModel);
  const siteMenuComponent = new MenuComponent();
  const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});

  const showNewTask = () => {
    siteMenuComponent.setActiveItem(MenuItem.TASKS);
    statisticsComponent.hide();
    boardController.show();
    boardController.createTask();
  };

  const showStatistics = () => {
    boardController.hide();
    statisticsComponent.show();
  };

  const showTasks = () => {
    statisticsComponent.hide();
    boardController.show();
  };

  const menuTab = {
    'control__new-task': showNewTask,
    'control__statistic': showStatistics,
    'control__task': showTasks,
  };

  render(siteHeader, siteMenuComponent);
  filterController.render();
  render(siteMain, boardComponent);
  boardController.render();

  render(siteMain, statisticsComponent);
  statisticsComponent.hide();

  siteMenuComponent.setOnChange((menuItem) => menuTab[menuItem]());
};

init();
