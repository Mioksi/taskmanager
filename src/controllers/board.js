import {Place, SortType, SHOWING_TASKS} from '../common/consts';
import {render, remove} from '../common/utils/render';
import SortComponent from '../components/board/sort';
import LoadMoreButtonComponent from '../components/board/load-more-button';
import TaskController from './task';

const renderTasks = (taskList, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskList, onDataChange, onViewChange);

    taskController.render(task);

    return taskController;
  });
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((first, second) => first.dueDate - second.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((first, second) => second.dueDate - first.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS;

    this._sortComponent = new SortComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (!isAllTasksArchived) {
      const taskList = container.querySelector(`.board__tasks`);

      render(container, this._sortComponent, Place.AFTEREND);

      const newTasks = renderTasks(taskList, this._tasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);

      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      this._renderLoadMoreButton();
    }
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();

    render(container, this._loadMoreButtonComponent);

    const onLoadMoreButtonClick = () => {
      const prevTasksCount = this._showingTasksCount;
      const taskList = container.querySelector(`.board__tasks`);
      this._showingTasksCount += SHOWING_TASKS;

      const sortedTasks = getSortedTasks(this._tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);
      const newTasks = renderTasks(taskList, sortedTasks, this._onDataChange, this._onViewChange);

      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    };

    this._loadMoreButtonComponent.setClickHandler(onLoadMoreButtonClick);
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS;

    const container = this._container.getElement();
    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, this._showingTasksCount);
    const taskList = container.querySelector(`.board__tasks`);

    taskList.innerHTML = ``;

    this._showedTaskControllers = renderTasks(taskList, sortedTasks, this._onDataChange, this._onViewChange);

    remove(this._loadMoreButtonComponent);
    this._renderLoadMoreButton();
  }
}
