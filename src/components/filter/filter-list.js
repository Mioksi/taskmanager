import {createFilter} from './filter.js';

const createFilterList = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilter(it, i === 0)).join(``);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export {createFilterList};
