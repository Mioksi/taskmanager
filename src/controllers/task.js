import {Mode, ESC_KEY, DAYS, SHAKE_ANIMATION_TIMEOUT, emptyTask, Place} from '../common/consts';
import TaskComponent from '../components/task/task';
import TaskEditComponent from '../components/task/task-edit';
import TaskModel from '../models/task';
import {render, replace, remove} from '../common/utils/render';

const parseFormData = (formData) => {
  const date = formData.get(`date`);

  const getDay = (days, day) => Object.assign(days, {[day]: false});
  const repeatingDays = DAYS.reduce(getDay, {});

  const getRepeatingDay = (days, day) => Object.assign(days, {[day]: true});

  return new TaskModel({
    'description': formData.get(`text`),
    'due_date': date ? new Date(date) : null,
    'repeating_days': formData.getAll(`repeat`).reduce(getRepeatingDay, repeatingDays),
    'color': formData.get(`color`),
    'is_favorite': false,
    'is_done': false,
  });
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
    const modeTypes = {
      [Mode.DEFAULT]: () => this._renderTask(oldTaskEditComponent, oldTaskComponent),
      [Mode.ADDING]: () => this._renderNewTask(oldTaskEditComponent, oldTaskComponent)
    };

    this._mode = mode;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._addTaskHandlers(task);

    modeTypes[mode]();
  }

  _renderTask(oldTaskEditComponent, oldTaskComponent) {
    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);

      this._replaceEditToTask();
    } else {
      render(this._container, this._taskComponent);
    }
  }

  _renderNewTask(oldTaskEditComponent, oldTaskComponent) {
    if (oldTaskEditComponent && oldTaskComponent) {
      remove(oldTaskComponent);
      remove(oldTaskEditComponent);
    }

    render(this._container, this._taskEditComponent, Place.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onFormEscPress);
  }

  _addTaskHandlers(task) {
    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();

      document.addEventListener(`keydown`, this._onFormEscPress);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      const newTask = TaskModel.clone(task);

      newTask.isArchive = !newTask.isArchive;

      this._onDataChange(this, task, newTask);
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      const newTask = TaskModel.clone(task);

      newTask.isFavorite = !newTask.isFavorite;

      this._onDataChange(this, task, newTask);
    });

    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      const formData = this._taskEditComponent.getData();
      const data = parseFormData(formData);

      this._taskEditComponent.setData({
        saveButtonText: `Saving...`,
      });

      this._onDataChange(this, task, data);
    });

    this._taskEditComponent.setDeleteButtonClickHandler(() => {
      this._taskEditComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      this._onDataChange(this, task, null);
    });
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

  shake() {
    this._taskEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._taskComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._taskEditComponent.getElement().style.animation = ``;
      this._taskComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
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
    if (evt.key === ESC_KEY || evt.key === ESC_KEY && this._mode === Mode.ADDING) {
      this._onDataChange(this, emptyTask, null);

      this._replaceEditToTask();

      document.removeEventListener(`keydown`, this._onFormEscPress);
    }
  }
}
