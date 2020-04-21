import {SHOWING_TASKS} from '../common/consts';
import TaskComponent from '../components/task/task';
import TaskEditComponent from '../components/task/task-edit';
import {render, replace} from '../common/utils/render';
import {isEscEvent} from '../common/utils/helpers';

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

export default class BoardController {
  constructor(container) {
    this._container = container;
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    const addLoadMoreEvent = (renderTaskList) => {
      const loadMoreButton = container.querySelector(`.load-more`);

      const onLoadMoreButtonClick = () => {
        tasks.splice(0, SHOWING_TASKS).map(renderTaskList);

        if (tasks.length === 0) {
          loadMoreButton.remove();
        }
      };

      loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
    };

    if (tasks.length > 0 || !isAllTasksArchived) {
      const taskList = container.querySelector(`.board__tasks`);

      const renderTaskList = (task) => renderTask(taskList, task);

      tasks.splice(0, SHOWING_TASKS).map(renderTaskList);

      addLoadMoreEvent(renderTaskList);
    }
  }
}
