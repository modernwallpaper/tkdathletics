if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then(function(registration) {
    if (registration) {
      console.log('Service Worker already registered.');
      // Do nothing as the service worker is already registered
    } else {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
    }
  }).catch(function(error) {
    console.log('Service Worker registration check failed:', error);
  });
} else {
  console.log('Service Workers are not supported in this browser.');
}
