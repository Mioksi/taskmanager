import {FILTER_ID_PREFIX} from '../../common/consts';
import {createFilter} from './components/filter-item.js';
import AbstractComponent from '../abstracts/abstract-component';

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterList = (filters) => {
  const filtersMarkup = filters.map((filter) => createFilter(filter, filter.checked)).join(``);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  getTemplate() {
    return createFilterList(this._filters);
  }

  _onFilterChange(handler) {
    return (evt) => {
      const filterName = getFilterNameById(evt.target.id);

      handler(filterName);
    };
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, this._onFilterChange(handler));
  }
}
