# Design Patterns Assignment - 10 Minutes

## Objective
Complete the following tasks to demonstrate your understanding of design patterns in this Task Management System.

## Tasks

### Task 1: Implement a New Observer (2 minutes)
Create a new observer class called `LoggingObserver` in `patterns/Observer.js` that:
- Logs all task events to a file-like structure (use console.log with a prefix `[LOG]`)
- Stores logs in an array property called `logs`
- Has a method `getLogs()` that returns all logs
- Has a method `clearLogs()` that clears all logs

**Hint**: Follow the pattern of `NotificationObserver` and `EmailObserver`

### Task 2: Add a New Task Type in Factory (2 minutes)
Extend the `TaskFactory` class to support a new task type called `'documentation'`:
- Documentation tasks should have priority `'low'` by default
- They should automatically get a tag `'documentation'`
- Create a static method `createDocumentationTask(id, title, description)` similar to other factory methods

**Location**: `patterns/Factory.js`

### Task 3: Implement a New Strategy (3 minutes)
Create a new priority strategy called `DocumentationPriorityStrategy` in `patterns/Strategy.js`:
- Should extend `PriorityStrategy`
- `calculateScore()` should return a base score of 5
- If the task has a `dueDate`, add 10 points if it's overdue, otherwise add 5 points
- Update `PriorityContext.getStrategyForPriority()` to return this strategy when priority is `'low'` and task has `'documentation'` tag

**Note**: You may need to modify the `getStrategyForPriority` method to accept the task as a parameter, or create a new method.

### Task 4: Add a New Decorator (2 minutes)
Create a new decorator called `EstimatedTimeDecorator` in `patterns/Decorator.js`:
- Should extend `TaskDecorator`
- Takes `task` and `estimatedHours` as constructor parameters
- Adds an `estimatedHours` property to the task
- Has a method `getEstimatedDays()` that returns `estimatedHours / 8`
- Updates `toJSON()` to include `estimatedHours`

### Task 5: Use New Features in Main (1 minute)
Update `index.js` to demonstrate all the new features:
1. Create a `LoggingObserver` instance and subscribe it
2. Create a documentation task using the new factory method
3. Apply the `EstimatedTimeDecorator` to one of the tasks with 16 hours estimated time
4. Display the estimated days for that task

## Expected Output
After completing all tasks, running `npm start` should:
- Show logs from `LoggingObserver` with `[LOG]` prefix
- Display a documentation task
- Show estimated time information for the decorated task

## Submission
Once completed, your code should:
- Run without errors (`npm start`)
- Demonstrate all 5 new features working together
- Follow the existing design patterns correctly

## Time Breakdown
- Task 1: ~2 minutes
- Task 2: ~2 minutes  
- Task 3: ~3 minutes
- Task 4: ~2 minutes
- Task 5: ~1 minute
- **Total: ~10 minutes**

Good luck! 🚀
