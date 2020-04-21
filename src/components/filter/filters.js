import {createFilter} from './components/filter-item.js';
import AbstractComponent from '../abstract-component';

const createFilterList = (filters) => {
  const filtersMarkup = filters.map(createFilter).join(``);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterList(this._filters);
  }
}
