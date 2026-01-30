/**
 * Task Model
 * Represents a single task in the system
 */
export class Task {
  constructor(id, title, description, priority = 'medium') {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = 'pending';
    this.createdAt = new Date();
    this.completedAt = null;
    this.tags = [];
    this.dueDate = null;
  }

  complete() {
    this.status = 'completed';
    this.completedAt = new Date();
  }

  updateStatus(newStatus) {
    // ERROR 1: Syntax error - missing closing parenthesis
    this.status = newStatus;
    if (newStatus === 'completed' && !this.completedAt {
      this.completedAt = new Date();
    }
  }

  addTag(tag) {
    // ERROR 2: Wrong method - using pop() instead of push()
    this.tags.pop(tag);
  }

  setDueDate(date) {
    // ERROR 3: Wrong parameter order - passing date as second parameter to Date constructor
    this.dueDate = new Date(date, null);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      status: this.status,
      createdAt: this.createdAt,
      completedAt: this.completedAt,
      tags: [...this.tags],
      dueDate: this.dueDate
    };
  }
}
