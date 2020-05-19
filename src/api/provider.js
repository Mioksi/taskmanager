import Task from '../models/task';
import {nanoid} from "nanoid";

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedTasks = (items) => items.filter(({success}) => success).map(({payload}) => payload.task);

const createItemStore = (acc, current) => Object.assign({}, acc, {[current.id]: current});
const createStoreStructure = (items) => items.reduce(createItemStore, {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;

    this._getStoreTasks = this._getStoreTasks.bind(this);
    this._getNewTask = this._getNewTask.bind(this);
    this._getUpdateTask = this._getUpdateTask.bind(this);
    this._syncTasks = this._syncTasks.bind(this);
  }

  getTasks() {
    if (isOnline()) {
      return this._api.getTasks()
        .then(this._getStoreTasks);
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(Task.parseTasks(storeTasks));
  }

  createTask(task) {
    if (isOnline()) {
      return this._api.createTask(task)
        .then(this._getNewTask);
    }

    const localNewTaskId = nanoid();
    const localNewTask = Task.clone(Object.assign(task, {id: localNewTaskId}));

    this._store.setItem(localNewTask.id, localNewTask.toRAW());

    return Promise.resolve(localNewTask);
  }

  updateTask(id, task) {
    if (isOnline()) {
      return this._api.updateTask(id, task)
        .then(this._getUpdateTask);
    }

    const localTask = Task.clone(Object.assign(task, {id}));

    this._store.setItem(id, localTask.toRAW());

    return Promise.resolve(localTask);
  }

  deleteTask(id) {
    if (isOnline()) {
      return this._api.deleteTask(id)
        .then(() => this._store.removeItem(id));
    }

    this._store.removeItem(id);

    return Promise.resolve();
  }

  sync() {
    if (isOnline()) {
      const storeTasks = Object.values(this._store.getItems());

      return this._api.sync(storeTasks)
        .then(this._syncTasks);
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _getStoreTasks(tasks) {
    const items = createStoreStructure(tasks.map((task) => task.toRAW()));

    this._store.setItems(items);

    return tasks;
  }

  _getNewTask(newTask) {
    this._store.setItem(newTask.id, newTask.toRAW());

    return newTask;
  }

  _getUpdateTask(newTask) {
    this._store.setItem(newTask.id, newTask.toRAW());

    return newTask;
  }

  _syncTasks(response) {
    const createdTasks = getSyncedTasks(response.created);
    const updatedTasks = getSyncedTasks(response.updated);

    const items = createStoreStructure([...createdTasks, ...updatedTasks]);

    this._store.setItems(items);
  }
}

