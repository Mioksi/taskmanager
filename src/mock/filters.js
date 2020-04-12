import {FILTER_NAMES} from "../common/consts.js";

const generateFilters = () => FILTER_NAMES.map((filter) => {
  const {name, isChecked} = filter;

  return {
    name,
    isChecked,
    count: Math.floor(Math.random() * 10),
  };
});

export {generateFilters};
