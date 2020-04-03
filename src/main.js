import {createMenu} from "./components/menu.js";
import {createFilter} from "./components/filter.js";
import {createBoard} from "./components/board.js";

const Place = {
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);

const render = (container, template, place = Place.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

const init = () => {
  render(siteHeader, createMenu());
  render(siteMain, createFilter());
  render(siteMain, createBoard());
};

init();
