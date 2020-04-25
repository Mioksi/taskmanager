import {Mode, ESC_KEY} from '../common/consts';
import TaskComponent from '../components/task/task';
import TaskEditComponent from '../components/task/task-edit';
import {render, replace} from '../common/utils/render';

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._mode = Mode.DEFAULT;

    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onFormEscPress = this._onFormEscPress.bind(this);
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();

      document.addEventListener(`keydown`, this._onFormEscPress);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite
      }));
    });

    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      this._replaceEditToTask();
    });

    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render(this._container, this._taskComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  _replaceEditToTask() {
    this._taskEditComponent.reset();

    replace(this._taskComponent, this._taskEditComponent);

    document.removeEventListener(`keydown`, this._onFormEscPress);

    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToEdit() {
    this._onViewChange();

    replace(this._taskEditComponent, this._taskComponent);

    this._mode = Mode.EDIT;
  }

  _onFormEscPress(evt) {
    if (evt.key === ESC_KEY) {
      this._replaceEditToTask();

      document.removeEventListener(`keydown`, this._onFormEscPress);
    }
  }
}
