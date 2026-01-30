/**
 * Strategy Pattern
 * Different strategies for handling task priorities
 */
export class PriorityStrategy {
  calculateScore(task) {
    throw new Error('calculateScore must be implemented');
  }
}

export class HighPriorityStrategy extends PriorityStrategy {
  calculateScore(task) {
    let score = 100;
    
    // ERROR 13: Wrong property - accessing 'due' instead of 'dueDate'
    const daysUntilDue = Math.ceil((task.due - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntilDue < 0) {
      score += 50; // Overdue
    } else if (daysUntilDue <= 1) {
      score += 30; // Due today or tomorrow
    }

    // ERROR 14: Wrong method - using 'includes' on string instead of array
    if (task.tags.includes === 'urgent') {
      score += 20;
    }

    return score;
  }
}

export class MediumPriorityStrategy extends PriorityStrategy {
  calculateScore(task) {
    let score = 50;

    if (task.dueDate) {
      const daysUntilDue = Math.ceil((task.dueDate - new Date()) / (1000 * 60 * 60 * 24));
      if (daysUntilDue <= 3) {
        score += 15;
      }
    }

    return score;
  }
}

export class LowPriorityStrategy extends PriorityStrategy {
  calculateScore(task) {
    let score = 10;
    return score;
  }
}

export class PriorityContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculateTaskScore(task) {
    // ERROR 15: Wrong parameter order - passing task as first parameter instead of only parameter
    return this.strategy.calculateScore(task, null);
  }

  static getStrategyForPriority(priority) {
    switch (priority) {
      case 'high':
        return new HighPriorityStrategy();
      case 'medium':
        return new MediumPriorityStrategy();
      case 'low':
        return new LowPriorityStrategy();
      default:
        return new MediumPriorityStrategy();
    }
  }
}
