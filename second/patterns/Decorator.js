import { Task } from '../models/Task.js';

/**
 * Decorator Pattern
 * Adds functionality to tasks dynamically
 */
export class TaskDecorator {
  constructor(task) {
    this.task = task;
  }

  complete() {
    return this.task.complete();
  }

  updateStatus(status) {
    return this.task.updateStatus(status);
  }

  toJSON() {
    return this.task.toJSON();
  }
}

export class TaggedTaskDecorator extends TaskDecorator {
  constructor(task, tags) {
    super(task);
    this.tags = Array.isArray(tags) ? tags : [tags];
    this.tags.forEach(tag => task.addTag(tag));
  }

  addTag(tag) {
    if (!this.task.tags.includes(tag)) {
      this.task.tags.push(tag);
      this.tags.push(tag);
    }
  }

  removeTag(tag) {
    const index = this.task.tags.indexOf(tag);
    if (index > -1) {
      this.task.tags.splice(index, 1);
      const tagIndex = this.tags.indexOf(tag);
      if (tagIndex > -1) {
        this.tags.splice(tagIndex, 1);
      }
    }
  }
}

export class DatedTaskDecorator extends TaskDecorator {
  constructor(task, dueDate) {
    super(task);
    this.dueDate = dueDate;
    task.setDueDate(dueDate);
  }

  isOverdue() {
    if (!this.dueDate) return false;
    return new Date() > this.dueDate;
  }

  daysUntilDue() {
    if (!this.dueDate) return null;
    const diff = this.dueDate - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}

export class PriorityTaskDecorator extends TaskDecorator {
  constructor(task, priority) {
    super(task);
    this.priority = priority;
    task.priority = priority;
  }

  upgradePriority() {
    const priorities = ['low', 'medium', 'high'];
    const currentIndex = priorities.indexOf(this.priority);
    if (currentIndex < priorities.length - 1) {
      this.priority = priorities[currentIndex + 1];
      this.task.priority = this.priority;
    }
  }

  downgradePriority() {
    const priorities = ['low', 'medium', 'high'];
    const currentIndex = priorities.indexOf(this.priority);
    if (currentIndex > 0) {
      this.priority = priorities[currentIndex - 1];
      this.task.priority = this.priority;
    }
  }
}
