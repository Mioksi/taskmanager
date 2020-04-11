import {COLORS, DAYS, MONTHS} from "../../common/consts";
import {formatTime} from "../../common/utils";
import {createColorsMarkup} from "./colors";
import {createRepeatingDaysMarkup} from "./repeating-days";

const getExpireTask = (dueDate) => {
  const isExpired = dueDate instanceof Date && dueDate < Date.now();

  return isExpired ? `card--deadline` : ``;
};

const getDateTask = (dueDate) => {
  const isDateShowing = !!dueDate;
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTHS[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  return [isDateShowing, date, time];
};

const getRepeatInfo = (repeatingDays) => {
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;

  return [isRepeatingTask, repeatClass];
};

const getTaskInfo = (task) => {
  const {dueDate, color, repeatingDays} = task;

  const deadlineClass = getExpireTask(dueDate);
  const [isDateShowing, date, time] = getDateTask(dueDate);
  const [isRepeatingTask, repeatClass] = getRepeatInfo(repeatingDays);
  const colorsMarkup = createColorsMarkup(COLORS, color);
  const repeatingDaysMarkup = createRepeatingDaysMarkup(DAYS, repeatingDays);

  return [isDateShowing, date, time, isRepeatingTask, repeatClass, deadlineClass, colorsMarkup, repeatingDaysMarkup];
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

const createTaskEdit = (task) => {
  const {description, color} = task;

  const [
    isDateShowing,
    date,
    time,
    isRepeatingTask,
    repeatClass,
    deadlineClass,
    colorsMarkup,
    repeatingDaysMarkup
  ] = getTaskInfo(task);

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
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export {createTaskEdit, getTaskInfo};
