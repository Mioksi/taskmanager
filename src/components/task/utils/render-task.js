import {isEscEvent} from '../../../common/utils/helpers';
import {render, replace} from '../../../common/utils/render';
import TaskComponent from '../task';
import TaskEditComponent from '../task-edit';

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

export {renderTask};
