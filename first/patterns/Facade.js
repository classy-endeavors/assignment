import { TaskManager } from './Singleton.js';
import { TaskFactory } from './Factory.js';
import { CommandInvoker, AddTaskCommand, DeleteTaskCommand, CompleteTaskCommand } from './Command.js';
import { PriorityContext } from './Strategy.js';
import { TaggedTaskDecorator, DatedTaskDecorator, PriorityTaskDecorator } from './Decorator.js';

/**
 * Facade Pattern
 * Provides a simplified interface to the complex subsystem
 */
export class TaskManagementFacade {
  constructor() {
    this.taskManager = TaskManager.getInstance();
    this.commandInvoker = new CommandInvoker(this.taskManager);
    this.priorityContext = new PriorityContext();
  }

  // Simplified task creation
  createTask(type, title, description, options = {}) {
    const id = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    let task = TaskFactory.createTask(type, id, title, description, options);

    // Apply decorators if needed
    if (options.tags && options.tags.length > 0) {
      task = new TaggedTaskDecorator(task, options.tags);
    }

    if (options.dueDate) {
      task = new DatedTaskDecorator(task, options.dueDate);
    }

    if (options.priority) {
      task = new PriorityTaskDecorator(task, options.priority);
    }

    const command = new AddTaskCommand(this.taskManager, task);
    this.commandInvoker.executeCommand(command);

    return task;
  }

  // Simplified task completion
  completeTask(taskId) {
    const command = new CompleteTaskCommand(this.taskManager, taskId);
    this.commandInvoker.executeCommand(command);
    return this.taskManager.getTask(taskId);
  }

  // Simplified task deletion
  deleteTask(taskId) {
    const command = new DeleteTaskCommand(this.taskManager, taskId);
    this.commandInvoker.executeCommand(command);
    return true;
  }

  // Get tasks sorted by priority score
  getTasksByPriority() {
    const tasks = this.taskManager.getAllTasks();
    
    return tasks.map(task => {
      const strategy = PriorityContext.getStrategyForPriority(task.priority);
      this.priorityContext.setStrategy(strategy);
      const score = this.priorityContext.calculateTaskScore(task);
      return { task, score };
    }).sort((a, b) => b.score - a.score).map(item => item.task);
  }

  // Undo last operation
  undo() {
    return this.commandInvoker.undo();
  }

  // Redo last undone operation
  redo() {
    return this.commandInvoker.redo();
  }

  // Subscribe to notifications
  subscribe(observer) {
    this.taskManager.subscribe(observer);
  }

  // Get all tasks
  getAllTasks() {
    return this.taskManager.getAllTasks();
  }

  // Get task by ID
  getTask(id) {
    return this.taskManager.getTask(id);
  }
}
