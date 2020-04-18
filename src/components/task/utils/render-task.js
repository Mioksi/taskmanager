import TaskComponent from '../task';
import TaskEditComponent from '../task-edit';
import {render} from '../../../common/utils';

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);

  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();

    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  editButton.addEventListener(`click`, onEditButtonClick);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement());
};

export {renderTask};
