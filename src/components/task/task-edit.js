import {getTaskInfo} from './common/task-info';
import AbstractSmartComponent from '../abstracts/abstract-smart-component';
import {createRepeatingDaysMarkup} from './common/repeating-days';
import {DAYS} from '../../common/consts';

const isRepeating = (repeatingDays) => Object.values(repeatingDays).some(Boolean);

const createDateDeadline = (date, time) => (
  `<fieldset class="card__date-deadline">
    <label class="card__input-deadline-wrap">
      <input
        class="card__date"
        type="text"
        placeholder=""
        name="date"
        value="${date} ${time}"
      />
    </label>
    </fieldset>`
);

const generateDate = (isDateShowing, date, time) => isDateShowing ? createDateDeadline(date, time) : ``;

const createRepeatingDays = (repeatingDaysMarkup) => (
  `<fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
      ${repeatingDaysMarkup}
    </div>
  </fieldset>`
);

const getRepeatingDays = (isRepeatingTask, repeatingDaysMarkup) => {
  return isRepeatingTask ? createRepeatingDays(repeatingDaysMarkup) : ``;
};

const createTaskEdit = (task, options = {}) => {
  const {description, color} = task;
  const {isDateShowing, isRepeatingTask, activeRepeatingDays} = options;

  const [
    date,
    time,
    repeatClass,
    deadlineClass,
    colorsMarkup
  ] = getTaskInfo(task, isDateShowing);

  const isBlockSaveButton = (isDateShowing && isRepeatingTask) ||
    (isRepeatingTask && !isRepeating(activeRepeatingDays));

  const repeatingDaysMarkup = createRepeatingDaysMarkup(DAYS, activeRepeatingDays);

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                </button>
                ${generateDate(isDateShowing, date, time)}
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                </button>
                  ${getRepeatingDays(isRepeatingTask, repeatingDaysMarkup)}
              </div>
            </div>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsMarkup}
              </div>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskEdit extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._submitHandler = null;

    this._onDeadlineToggleClick = this._onDeadlineToggleClick.bind(this);
    this._onRepeatToggleClick = this._onRepeatToggleClick.bind(this);
    this._onRepeatDayChange = this._onRepeatDayChange.bind(this);

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTaskEdit(this._task, {
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      activeRepeatingDays: this._activeRepeatingDays,
    });
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  _onDeadlineToggleClick() {
    this._isDateShowing = !this._isDateShowing;

    this.rerender();
  }

  _onRepeatToggleClick() {
    this._isRepeatingTask = !this._isRepeatingTask;

    this.rerender();
  }

  _onRepeatDayChange(evt) {
    this._activeRepeatingDays[evt.target.value] = evt.target.checked;

    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onDeadlineToggleClick);

    element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onRepeatToggleClick);

    const repeatDays = element.querySelector(`.card__repeat-days`);

    if (repeatDays) {
      repeatDays.addEventListener(`change`, this._onRepeatDayChange);
    }
  }
}
