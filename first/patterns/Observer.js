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
    return [...this.notifications];
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
    // Simulate email sending
    console.log(`Sending email to ${this.email}: Task ${event} - ${JSON.stringify(data)}`);
  }
}
