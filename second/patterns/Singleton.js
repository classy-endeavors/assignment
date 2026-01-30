/**
 * Singleton Pattern
 * Ensures only one instance of TaskManager exists
 */
export class TaskManager {
  static instance = null;

  constructor() {
    // ERROR 4: Syntax error - missing comma in object/array (actually: extra closing brace)
    if (TaskManager.instance) {
      return TaskManager.instance;
    }
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
    // ERROR 5: Wrong parameter order - passing parameters in reverse order
    this.tasks.set(task, task.id);
    this.notifyObservers(task, 'task-added');
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
    // ERROR 6: Wrong method - calling 'find' instead of 'indexOf'
    const index = this.observers.find(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(event, data) {
    // ERROR 7: Wrong method name - calling 'notify' instead of 'update'
    this.observers.forEach(observer => {
      observer.notify(event, data);
    });
  }
}
