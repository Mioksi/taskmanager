import {getTaskInfo} from './common/task-info';
import AbstractSmartComponent from '../abstracts/abstract-smart-component';
import {createRepeatingDaysMarkup} from './common/repeating-days';
import {CURRENT_DAY, DAYS, MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH, defaultData} from '../../common/consts';
import {isRepeating} from '../../common/utils/helpers';
import flatpickr from "flatpickr";
import {encode} from "he";

import "flatpickr/dist/flatpickr.min.css";

const isAllowableDescriptionLength = (description) => {
  const length = description.length;

  return length >= MIN_DESCRIPTION_LENGTH &&
    length <= MAX_DESCRIPTION_LENGTH;
};

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
  const {color} = task;
  const {isDateShowing, isRepeatingTask, activeRepeatingDays, currentDescription, externalData} = options;

  const description = encode(currentDescription);

  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;

  const {
    date,
    time,
    repeatClass,
    deadlineClass,
    colorsMarkup
  } = getTaskInfo(task, isDateShowing);

  const isBlockSaveButton = (isDateShowing && isRepeatingTask) ||
    (isRepeatingTask && !isRepeating(activeRepeatingDays)) ||
    !isAllowableDescriptionLength(description);

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
            <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>${saveButtonText}</button>
            <button class="card__delete" type="button">${deleteButtonText}</button>
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
    this._currentDescription = task.description;
    this._externalData = defaultData;

    this._submitHandler = null;
    this._deleteButtonClickHandler = null;
    this._flatpickr = null;

    this._onDeadlineToggleClick = this._onDeadlineToggleClick.bind(this);
    this._onRepeatToggleClick = this._onRepeatToggleClick.bind(this);
    this._onRepeatDayChange = this._onRepeatDayChange.bind(this);
    this._onCardTextInput = this._onCardTextInput.bind(this);

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTaskEdit(this._task, {
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      externalData: this._externalData,
      activeRepeatingDays: this._activeRepeatingDays,
      currentDescription: this._currentDescription,
    });
  }

  removeElement() {
    if (this._flatpickr) {
      this._destroyFlatpickr();
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._currentDescription = task.description;

    this.rerender();
  }

  getData() {
    const form = this.getElement().querySelector(`.card__form`);

    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, defaultData, data);
    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__delete`).addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
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

  _onCardTextInput(evt) {
    this._currentDescription = evt.target.value;

    const saveButton = this.getElement().querySelector(`.card__save`);

    saveButton.disabled = !isAllowableDescriptionLength(this._currentDescription);
  }

  _setFlatpickr() {
    return {
      altInput: true,
      allowInput: true,
      defaultDate: this._task.dueDate || CURRENT_DAY
    };
  }

  _destroyFlatpickr() {
    this._flatpickr.destroy();
    this._flatpickr = null;
  }

  _initFlatpickr() {
    const dateElement = this.getElement().querySelector(`.card__date`);

    this._flatpickr = flatpickr(dateElement, this._setFlatpickr());
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._destroyFlatpickr();
    }

    if (this._isDateShowing) {
      this._initFlatpickr();
    }
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

    element.querySelector(`.card__text`).addEventListener(`input`, this._onCardTextInput);
  }
}
