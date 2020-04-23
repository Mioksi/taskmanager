import AbstractComponent from '../abstracts/abstract-component';

const createLoadMoreButton = () => `<button class="load-more" type="button">load more</button>`;

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButton();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
