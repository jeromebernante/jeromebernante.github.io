// Check for service worker support and register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
      .register('service-worker.js')
      .then(function (registration) {
          console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function (error) {
          console.error('Service Worker registration failed:', error);
      });
}

// Function to request notification permission
function requestNotificationPermission() {
  if ('Notification' in window) {
      Notification.requestPermission()
          .then(function (permission) {
              if (permission === 'granted') {
                  console.log('Notification permission granted.');
                  subscribeToPushNotifications();
              } else {
                  console.warn('Notification permission denied.');
              }
          });
  }
}

// Function to subscribe to push notifications
function subscribeToPushNotifications() {
  navigator.serviceWorker.ready
      .then(function (serviceWorkerRegistration) {
          return serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true });
      })
      .then(function (subscription) {
          console.log('Subscribed to push notifications:', subscription);
          // Send the subscription object to your server for future use
      })
      .catch(function (error) {
          console.error('Push subscription failed:', error);
      });
}

// Function to trigger a test notification
function testNotification() {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
          .then(function (serviceWorkerRegistration) {
              const options = {
                  body: 'This is a test notification!',
                  icon: 'icon.png',
              };

              serviceWorkerRegistration.showNotification('Test Notification', options);
          });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const subscribeButton = document.getElementById('subscribeButton');
  subscribeButton.addEventListener('click', requestNotificationPermission);

  const testNotificationButton = document.getElementById('testNotificationButton');
  testNotificationButton.addEventListener('click', testNotification);
});
