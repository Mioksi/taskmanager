import {createTaskEdit} from "./task-edit.js";
import {createTaskList} from "./task.js";

export const createBoardTasks = () => `<div class="board__tasks">${createTaskEdit()} ${createTaskList()}</div>`;
