import {createMenu} from './components/menu.js';
import {createFilterList} from './components/filter-list.js';
import {generateFilters} from './mock/filters.js';
import {createBoard} from './components/board.js';
import {render} from './common/utils.js';

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);

const filters = generateFilters();

const init = () => {
  render(siteHeader, createMenu());
  render(siteMain, createFilterList(filters));
  render(siteMain, createBoard());
};

init();
