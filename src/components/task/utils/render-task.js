import {isEscEvent} from '../../../common/utils/helpers';
import {render, replace} from '../../../common/utils/render';
import TaskComponent from '../task';
import TaskEditComponent from '../task-edit';

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);

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

  editButton.addEventListener(`click`, onEditButtonClick);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent);
};

export {renderTask};
