import API from './api/api';
import BoardComponent from "./components/board/board";
import BoardController from './controllers/board';
import MenuComponent, {MenuItem} from "./components/menu/menu";
import StatisticsComponent from './components/statistics/statistics';
import TasksModel from './models/tasks';
import FilterController from './controllers/filter';
import {AUTHORIZATION, END_POINT} from './common/consts';
import {render} from "./common/utils/render";

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const init = () => {
  const api = new API(END_POINT, AUTHORIZATION);
  const tasksModel = new TasksModel();

  const boardComponent = new BoardComponent();
  const boardController = new BoardController(boardComponent, tasksModel, api);
  const filterController = new FilterController(siteMain, tasksModel);
  const siteMenuComponent = new MenuComponent();
  const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});

  render(siteHeader, siteMenuComponent);
  filterController.render();
  render(siteMain, boardComponent);

  render(siteMain, statisticsComponent);
  statisticsComponent.hide();

  siteMenuComponent.setOnChange((menuItem) => {
    switch (menuItem) {
      case MenuItem.NEW_TASK:
        siteMenuComponent.setActiveItem(MenuItem.TASKS);
        statisticsComponent.hide();
        boardController.show();
        boardController.createTask();
        break;
      case MenuItem.STATISTICS:
        boardController.hide();
        statisticsComponent.show();
        break;
      case MenuItem.TASKS:
        statisticsComponent.hide();
        boardController.show();
        break;
    }
  });

  api.getTasks()
    .then((tasks) => {
      tasksModel.setTasks(tasks);
      boardController.render();
    });

  window.addEventListener(`load`, () => {
    navigator.serviceWorker.register(`/sw.js`)
      .then(() => {
      }).catch(() => {
      });
  });
};

init();
