if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then(function(registration) {
    if (!registration) {
      // No service worker is registered
      navigator.serviceWorker.register('/service-worker.js').then(function(reg) {
        console.log('Service worker registered with scope: ', reg.scope);
      }).catch(function(error) {
        console.log('Service worker registration failed: ', error);
      });
    } else {
      // If already registered do nothing
      console.log('Service worker is already registered with scope: ', registration.scope);
    }
  }).catch(function(error) {
    console.log('Service worker registration check failed: ', error);
  });
} else {
  console.log('Service workers are not supported in this browser.');
}
