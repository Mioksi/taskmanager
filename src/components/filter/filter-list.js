import {createFilter} from './filter.js';

const createFilterList = (filters) => {
  const filtersMarkup = filters.map((createFilter)).join(``);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export {createFilterList};
