import {StatusCode, Method, TASKS_URL} from '../common/consts';
import Task from '../models/task';

const checkStatus = (response) => {
  if (response.status >= StatusCode.SUCCESS && response.status < StatusCode.REDIRECT) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTasks() {
    return this._load({url: TASKS_URL})
      .then((response) => response.json())
      .then(Task.parseTasks);
  }

  createTask(task) {
    return this._load(this._getCreateTaskConfig(task))
      .then((response) => response.json())
      .then(Task.parseTask)
      .catch((err) => {
        throw err;
      });
  }

  deleteTask(id) {
    return this._load({url: `tasks/${id}`, method: Method.DELETE});
  }

  updateTask(id, data) {
    return this._load(this._getUpdateTaskConfig(id, data))
      .then((response) => response.json())
      .then(Task.parseTask)
      .catch((err) => {
        throw err;
      });
  }

  _getCreateTaskConfig(task) {
    return this._getLoadConfig(TASKS_URL, Method.POST, task);
  }

  _getUpdateTaskConfig(id, data) {
    return this._getLoadConfig(`${TASKS_URL}/${id}`, Method.PUT, data);
  }

  _getLoadConfig(url, method, data) {
    return {
      url,
      method,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    };
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
