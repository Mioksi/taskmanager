export const SHOWING_TASKS = 8;
export const MIN_DESCRIPTION_LENGTH = 1;
export const MAX_DESCRIPTION_LENGTH = 140;
export const SHAKE_ANIMATION_TIMEOUT = 600;

export const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

export const ESC_KEY = `Escape`;

export const CURRENT_DAY = `today`;
export const FILTER_ID_PREFIX = `filter__`;
export const HIDDEN_CLASS = `visually-hidden`;

export const FORMAT_TIME = `hh:mm`;
export const FORMAT_DATE = `DD MMMM`;

export const AUTHORIZATION = `Basic eAekUwkqYXNzd29y`;
export const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;
export const TASKS_URL = `tasks`;

export const Color = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

export const COLORS = Object.values(Color);

export const colorToHex = {
  black: `#000000`,
  blue: `#0c5cdd`,
  green: `#31b55c`,
  pink: `#ff3cb9`,
  yellow: `#ffe125`,
};

export const emptyTask = {
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
  color: Color.BLACK,
  isFavorite: false,
  isArchive: false,
};

export const defaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};

export const Place = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
};

export const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const FilterType = {
  ALL: `all`,
  OVERDUE: `overdue`,
  TODAY: `today`,
  FAVORITES: `favorites`,
  REPEATING: `repeating`,
  ARCHIVE: `archive`,
};

export const StatusCode = {
  SUCCESS: 200,
  REDIRECT: 300,
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};
