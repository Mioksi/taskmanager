import {SortType} from '../../common/consts';
import AbstractComponent from '../abstracts/abstract-component';

const createSorting = () => (
  `<div class="board__filter-list">
    <a href="#"  data-sort-type="${SortType.DEFAULT}" class="board__filter">SORT BY DEFAULT</a>
    <a href="#" data-sort-type="${SortType.DATE_UP}" class="board__filter">SORT BY DATE up</a>
    <a href="#" data-sort-type="${SortType.DATE_DOWN}" class="board__filter">SORT BY DATE down</a>
  </div>`
);

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
    this._onSortTypeChange = this.onSortTypeChange.bind(this);
  }

  getTemplate() {
    return createSorting();
  }

  getSortType() {
    return this._currenSortType;
  }

  onSortTypeChange(handler) {
    return (evt) => {
      evt.preventDefault();

      if (!evt.target.dataset.sortType) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    };
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, this._onSortTypeChange(handler));
  }
}
