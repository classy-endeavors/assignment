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
    if (['pending', 'in-progress', 'completed', 'cancelled'].includes(newStatus)) {
      this.status = newStatus;
      if (newStatus === 'completed' && !this.completedAt) {
        this.completedAt = new Date();
      }
    }
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  setDueDate(date) {
    this.dueDate = date;
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
