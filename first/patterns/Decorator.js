import { Task } from '../models/Task.js';

/**
 * Decorator Pattern
 * Adds functionality to tasks dynamically
 */
export class TaskDecorator {
  constructor(task) {
    this.task = task;
  }

  // Delegate all Task methods to the underlying task
  complete() {
    return this.task.complete();
  }

  updateStatus(status) {
    return this.task.updateStatus(status);
  }

  addTag(tag) {
    return this.task.addTag(tag);
  }

  setDueDate(date) {
    return this.task.setDueDate(date);
  }

  toJSON() {
    return this.task.toJSON();
  }

  // Proxy all other properties and methods
  get id() { return this.task.id; }
  get title() { return this.task.title; }
  get description() { return this.task.description; }
  get priority() { return this.task.priority; }
  set priority(value) { this.task.priority = value; }
  get status() { return this.task.status; }
  set status(value) { this.task.status = value; }
  get createdAt() { return this.task.createdAt; }
  get completedAt() { return this.task.completedAt; }
  set completedAt(value) { this.task.completedAt = value; }
  get tags() { return this.task.tags; }
  get dueDate() { return this.task.dueDate; }
  set dueDate(value) { this.task.dueDate = value; }
}

export class TaggedTaskDecorator extends TaskDecorator {
  constructor(task, tags) {
    super(task);
    this._addedTags = Array.isArray(tags) ? tags : [tags];
    this._addedTags.forEach(tag => this.addTag(tag));
  }

  addTag(tag) {
    if (!this.task.tags.includes(tag)) {
      this.task.tags.push(tag);
      if (!this._addedTags.includes(tag)) {
        this._addedTags.push(tag);
      }
    }
  }

  removeTag(tag) {
    const index = this.task.tags.indexOf(tag);
    if (index > -1) {
      this.task.tags.splice(index, 1);
      const tagIndex = this._addedTags.indexOf(tag);
      if (tagIndex > -1) {
        this._addedTags.splice(tagIndex, 1);
      }
    }
  }
}

export class DatedTaskDecorator extends TaskDecorator {
  constructor(task, dueDate) {
    super(task);
    this._dueDate = dueDate;
    this.setDueDate(dueDate);
  }

  isOverdue() {
    if (!this._dueDate) return false;
    return new Date() > this._dueDate;
  }

  daysUntilDue() {
    if (!this._dueDate) return null;
    const diff = this._dueDate - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}

export class PriorityTaskDecorator extends TaskDecorator {
  constructor(task, priority) {
    super(task);
    this.priority = priority; // This will use the setter from TaskDecorator
  }

  upgradePriority() {
    const priorities = ['low', 'medium', 'high'];
    const currentIndex = priorities.indexOf(this.priority);
    if (currentIndex < priorities.length - 1) {
      this.priority = priorities[currentIndex + 1];
    }
  }

  downgradePriority() {
    const priorities = ['low', 'medium', 'high'];
    const currentIndex = priorities.indexOf(this.priority);
    if (currentIndex > 0) {
      this.priority = priorities[currentIndex - 1];
    }
  }
}
