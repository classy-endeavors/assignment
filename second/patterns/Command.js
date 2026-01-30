/**
 * Command Pattern
 * Encapsulates requests as objects for undo/redo functionality
 */
export class Command {
  execute() {
    throw new Error('execute must be implemented');
  }

  undo() {
    throw new Error('undo must be implemented');
  }
}

export class AddTaskCommand extends Command {
  constructor(taskManager, task) {
    super();
    this.taskManager = taskManager;
    this.task = task;
  }

  execute() {
    this.taskManager.addTask(this.task);
    return this.task;
  }

  undo() {
    this.taskManager.deleteTask(this.task.id);
  }
}

export class DeleteTaskCommand extends Command {
  constructor(taskManager, taskId) {
    super();
    this.taskManager = taskManager;
    this.taskId = taskId;
    this.deletedTask = null;
  }

  execute() {
    this.deletedTask = this.taskManager.getTask(this.taskId);
    if (this.deletedTask) {
      this.taskManager.deleteTask(this.taskId);
      return true;
    }
    return false;
  }

  undo() {
    if (this.deletedTask) {
      this.taskManager.addTask(this.deletedTask);
    }
  }
}

export class CompleteTaskCommand extends Command {
  constructor(taskManager, taskId) {
    super();
    this.taskManager = taskManager;
    this.taskId = taskId;
    this.previousStatus = null;
  }

  execute() {
    const task = this.taskManager.getTask(this.taskId);
    if (task) {
      this.previousStatus = task.status;
      task.complete();
      return true;
    }
    return false;
  }

  undo() {
    const task = this.taskManager.getTask(this.taskId);
    if (task && this.previousStatus !== null) {
      task.status = this.previousStatus;
      task.completedAt = null;
    }
  }
}

export class CommandInvoker {
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.history = [];
    this.currentIndex = -1;
  }

  executeCommand(command) {
    // Remove any commands after current index (for redo)
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    command.execute();
    this.history.push(command);
    this.currentIndex++;
  }

  undo() {
    if (this.canUndo()) {
      const command = this.history[this.currentIndex];
      command.undo();
      this.currentIndex--;
      return true;
    }
    return false;
  }

  redo() {
    if (this.canRedo()) {
      this.currentIndex++;
      const command = this.history[this.currentIndex];
      command.execute();
      return true;
    }
    return false;
  }

  canUndo() {
    return this.currentIndex >= 0;
  }

  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }
}
