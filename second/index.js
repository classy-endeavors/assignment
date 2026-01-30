import { TaskManagementFacade } from './patterns/Facade.js';
import { NotificationObserver, EmailObserver } from './patterns/Observer.js';

/**
 * Main entry point demonstrating all design patterns
 */
function main() {
  console.log('=== Task Management System - Design Patterns Demo ===\n');

  // Initialize facade (simplified interface)
  const taskFacade = new TaskManagementFacade();

  // Set up observers
  const consoleObserver = new NotificationObserver('Console');
  const emailObserver = new EmailObserver('admin@example.com');
  
  taskFacade.subscribe(consoleObserver);
  taskFacade.subscribe(emailObserver);

  // Create tasks using factory pattern (through facade)
  console.log('--- Creating Tasks ---');
  const task1 = taskFacade.createTask('urgent', 'Fix critical bug', 'Application crashes on login', {
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    tags: ['critical', 'bug']
  });

  const task2 = taskFacade.createTask('feature', 'Add dark mode', 'Implement dark theme support', {
    priority: 'medium',
    tags: ['ui', 'enhancement']
  });

  const task3 = taskFacade.createTask('bug', 'Memory leak', 'Fix memory leak in data processing', {
    priority: 'high'
  });

  console.log('\n--- All Tasks ---');
  // ERROR 8: Wrong method name - calling 'getAllTask' instead of 'getAllTasks'
  taskFacade.getAllTask().forEach(task => {
    console.log(`[${task.priority.toUpperCase()}] ${task.title} - ${task.status}`);
  });

  console.log('\n--- Tasks Sorted by Priority Score ---');
  const sortedTasks = taskFacade.getTasksByPriority();
  sortedTasks.forEach(task => {
    console.log(`- ${task.title} (${task.priority})`);
  });

  console.log('\n--- Completing Task ---');
  taskFacade.completeTask(task1.id);
  console.log(`Task "${task1.title}" is now ${task1.status}`);

  console.log('\n--- Undo Operation ---');
  taskFacade.undo();
  console.log(`Task "${task1.title}" status after undo: ${task1.status}`);

  console.log('\n--- Redo Operation ---');
  taskFacade.redo();
  console.log(`Task "${task1.title}" status after redo: ${task1.status}`);

  console.log('\n--- Notifications ---');
  console.log(`Total notifications received: ${consoleObserver.getNotifications().length}`);

  console.log('\n=== Demo Complete ===');
}

main();
