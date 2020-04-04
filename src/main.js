import {createMenu} from './components/menu.js';
import {createFilter} from './components/filter.js';
import {createBoard} from './components/board.js';
import {render} from './common/utils.js';

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);

const init = () => {
  render(siteHeader, createMenu());
  render(siteMain, createFilter());
  render(siteMain, createBoard());
};

init();
