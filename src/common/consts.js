export const TASK_COUNT = 20;
export const SHOWING_TASKS = 8;
export const MAX_DAYS = 8;
export const MIN_DESCRIPTION_LENGTH = 1;
export const MAX_DESCRIPTION_LENGTH = 140;

export const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

export const ESC_KEY = `Escape`;

export const CURRENT_DAY = `today`;
export const FILTER_ID_PREFIX = `filter__`;
export const HIDDEN_CLASS = `visually-hidden`;

export const FORMAT_TIME = `hh:mm`;
export const FORMAT_DATE = `DD MMMM`;

export const Color = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

export const COLORS = Object.values(Color);

export const Place = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`
};

export const Sign = {
  NEGATIVE: -1,
  POSITIVE: 1
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
