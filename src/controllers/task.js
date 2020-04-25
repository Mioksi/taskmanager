import {ESC_KEY} from '../common/consts';
import TaskComponent from '../components/task/task';
import TaskEditComponent from '../components/task/task-edit';
import {render, replace} from '../common/utils/render';

export default class TaskController {
  constructor(container) {
    this._container = container;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onFormEscPress = this._onFormEscPress.bind(this);
  }

  render(task) {
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();

      document.addEventListener(`keydown`, this._onFormEscPress);
    });

    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      this._replaceEditToTask();
    });

    render(this._container, this._taskComponent);
  }

  _replaceEditToTask() {
    replace(this._taskComponent, this._taskEditComponent);

    document.removeEventListener(`keydown`, this._onFormEscPress);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _onFormEscPress(evt) {
    if (evt.key === ESC_KEY) {
      this._replaceEditToTask();

      document.removeEventListener(`keydown`, this._onFormEscPress);
    }
  }
}
