import {FILTER_NAMES} from "../common/consts.js";

const generateFilters = () => FILTER_NAMES.map((filter) => {
  return {
    name: filter,
    count: Math.floor(Math.random() * 10)
  };
});

export {generateFilters};
