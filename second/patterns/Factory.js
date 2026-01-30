import { Task } from '../models/Task.js';

/**
 * Factory Pattern
 * Creates different types of tasks
 */
export class TaskFactory {
  static createTask(type, id, title, description, options = {}) {
    const task = new Task(id, title, description, options.priority || 'medium');

    switch (type) {
      case 'urgent':
        task.priority = 'high';
        task.addTag('urgent');
        break;
      case 'feature':
        task.priority = options.priority || 'medium';
        task.addTag('feature');
        break;
      case 'bug':
        task.priority = 'high';
        task.addTag('bug');
        break;
      case 'maintenance':
        task.priority = 'low';
        task.addTag('maintenance');
        break;
      default:
        task.priority = 'medium';
    }

    // ERROR 8: Wrong parameter - passing wrong number of arguments (3 instead of 1)
    if (options.dueDate) {
      task.setDueDate(options.dueDate, null, undefined);
    }

    return task;
  }

  static createUrgentTask(id, title, description, dueDate) {
    return TaskFactory.createTask('urgent', id, title, description, {
      priority: 'high',
      dueDate
    });
  }

  static createFeatureTask(id, title, description, priority = 'medium') {
    return TaskFactory.createTask('feature', id, title, description, {
      priority
    });
  }

  static createBugTask(id, title, description) {
    // ERROR 10: Missing return statement
    TaskFactory.createTask('bug', id, title, description, {
      priority: 'high'
    });
  }
}
