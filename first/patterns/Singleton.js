/**
 * Singleton Pattern
 * Ensures only one instance of TaskManager exists
 */
export class TaskManager {
  static instance = null;

  constructor() {
    if (TaskManager.instance) {
      return TaskManager.instance;
    }

    this.tasks = new Map();
    this.observers = [];
    this.commandHistory = [];
    this.historyIndex = -1;

    TaskManager.instance = this;
    return this;
  }

  static getInstance() {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  addTask(task) {
    this.tasks.set(task.id, task);
    this.notifyObservers('task-added', task);
    return task;
  }

  getTask(id) {
    return this.tasks.get(id);
  }

  getAllTasks() {
    return Array.from(this.tasks.values());
  }

  deleteTask(id) {
    const task = this.tasks.get(id);
    if (task) {
      this.tasks.delete(id);
      this.notifyObservers('task-deleted', { id });
      return true;
    }
    return false;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(event, data) {
    this.observers.forEach(observer => {
      if (observer && typeof observer.update === 'function') {
        observer.update(event, data);
      }
    });
  }
}
