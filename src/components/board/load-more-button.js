import {SHOWING_TASKS} from '../../common/consts';

const createLoadMoreButton = () => `<button class="load-more" type="button">load more</button>`;

const addLoadMoreEvent = (boardComponent, tasks, renderTask, taskList) => {
  const loadMoreButton = boardComponent.getElement().querySelector(`.load-more`);

  const onLoadMoreButtonClick = () => {
    tasks.splice(0, SHOWING_TASKS).forEach((task) => renderTask(taskList, task));

    if (tasks.length === 0) {
      removeLoadMoreButton();
    }
  };

  const removeLoadMoreButton = () => {
    loadMoreButton.remove();

    loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);
  };

  loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
};

export {createLoadMoreButton, addLoadMoreEvent};
