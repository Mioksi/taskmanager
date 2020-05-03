import {Mode, ESC_KEY, color, Place} from '../common/consts';
import TaskComponent from '../components/task/task';
import TaskEditComponent from '../components/task/task-edit';
import {render, replace, remove} from '../common/utils/render';

export const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    "mo": false,
    "tu": false,
    "we": false,
    "th": false,
    "fr": false,
    "sa": false,
    "su": false,
  },
  color: color.BLACK,
  isFavorite: false,
  isArchive: false,
};

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

  render(task, mode) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._mode = mode;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._addTaskHandlers(task);

    switch (mode) {
      case Mode.DEFAULT:
        if (oldTaskEditComponent && oldTaskComponent) {
          replace(this._taskComponent, oldTaskComponent);
          replace(this._taskEditComponent, oldTaskEditComponent);
          this._replaceEditToTask();
        } else {
          render(this._container, this._taskComponent);
        }
        break;
      case Mode.ADDING:
        if (oldTaskEditComponent && oldTaskComponent) {
          remove(oldTaskComponent);
          remove(oldTaskEditComponent);
        }
        document.addEventListener(`keydown`, this._onFormEscPress);
        render(this._container, this._taskEditComponent, Place.AFTERBEGIN);
        break;
    }
  }

  _addTaskHandlers(task) {
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

      const data = this._taskEditComponent.getData();

      this._onDataChange(this, task, data);
    });

    this._taskEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, task, null));
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  destroy() {
    remove(this._taskEditComponent);
    remove(this._taskComponent);

    document.removeEventListener(`keydown`, this._onFormEscPress);
  }

  _replaceEditToTask() {
    this._taskEditComponent.reset();

    if (document.contains(this._taskEditComponent.getElement())) {
      replace(this._taskComponent, this._taskEditComponent);
    }

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
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyTask, null);
      }

      this._replaceEditToTask();

      document.removeEventListener(`keydown`, this._onFormEscPress);
    }
  }
}
