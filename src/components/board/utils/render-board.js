import {SHOWING_TASKS} from '../../../common/consts';
import {addLoadMoreEvent} from '../components/load-more-button';

const renderBoard = (boardComponent, tasks, renderTask) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (tasks.length > 0 || !isAllTasksArchived) {
    const taskList = boardComponent.getElement().querySelector(`.board__tasks`);

    const renderTaskList = (task) => renderTask(taskList, task);

    tasks.splice(0, SHOWING_TASKS).map(renderTaskList);

    addLoadMoreEvent(boardComponent, tasks, renderTaskList);
  }
};

export {renderBoard};
