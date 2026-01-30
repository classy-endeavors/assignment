/**
 * Observer Pattern
 * Notification system for task updates
 */
export class NotificationObserver {
  constructor(name) {
    this.name = name;
    this.notifications = [];
  }

  update(event, data) {
    const notification = {
      timestamp: new Date(),
      event,
      data,
      observer: this.name
    };

    this.notifications.push(notification);
    this.displayNotification(notification);
  }

  displayNotification(notification) {
    console.log(`[${this.name}] ${notification.event}:`, notification.data);
  }

  getNotifications() {
    // ERROR 11: Wrong property name - 'notification' instead of 'notifications'
    return this.notification;
  }

  clearNotifications() {
    this.notifications = [];
  }
}

export class EmailObserver {
  constructor(email) {
    this.email = email;
  }

  update(event, data) {
    // ERROR 12: Wrong method - calling 'stringify' on wrong object (event instead of data)
    console.log(`Sending email to ${this.email}: Task ${event} - ${JSON.stringify(event)}`);
  }
}
