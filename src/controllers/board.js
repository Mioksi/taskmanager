import {Place, SortType, SHOWING_TASKS} from '../common/consts';
import {render, replace, remove} from '../common/utils/render';
import {isEscEvent} from '../common/utils/helpers';
import SortComponent from '../components/board/sort';
import TaskComponent from '../components/task/task';
import TaskEditComponent from '../components/task/task-edit';
import LoadMoreButtonComponent from '../components/board/load-more-button';

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onFormEscPress = (evt) => {
    isEscEvent(evt, replaceEditToTask);

    document.removeEventListener(`keydown`, onFormEscPress);
  };

  const onEditButtonClick = () => {
    replaceTaskToEdit();

    document.addEventListener(`keydown`, onFormEscPress);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();

    replaceEditToTask();

    document.removeEventListener(`keydown`, onFormEscPress);
  };

  taskComponent.setEditButtonClickHandler(onEditButtonClick);
  taskEditComponent.setSubmitHandler(onEditFormSubmit);

  render(taskListElement, taskComponent);
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

    this._sortComponent = new SortComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    const renderLoadMoreButton = (renderTaskList, showingTasksCount) => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      render(container, this._loadMoreButtonComponent);

      const onLoadMoreButtonClick = () => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount += SHOWING_TASKS;

        const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);

        sortedTasks.map(renderTaskList);

        if (showingTasksCount >= tasks.length) {
          remove(this._loadMoreButtonComponent);
        }
      };

      this._loadMoreButtonComponent.setClickHandler(onLoadMoreButtonClick);
    };

    if (!isAllTasksArchived) {
      const showingTasksCount = SHOWING_TASKS;
      const taskList = container.querySelector(`.board__tasks`);

      const renderTaskList = (task) => renderTask(taskList, task);

      render(container, this._sortComponent, Place.AFTEREND);

      tasks.slice(0, showingTasksCount).map(renderTaskList);

      renderLoadMoreButton(renderTaskList, showingTasksCount);

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

        taskList.innerHTML = ``;

        sortedTasks.map(renderTaskList);

        remove(this._loadMoreButtonComponent);
        renderLoadMoreButton(renderTaskList, showingTasksCount);
      });
    }
  }
}
