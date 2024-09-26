/* 
 * @param message - The message type to be sent to the service worker
 * @description - This function sends a message type to the service worker, but you need to handle the incoming message yourself in the sw.ts file
*/
export const postMessageToServiceWorker = (message: string) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(function() {
      navigator.serviceWorker.ready.then((reg) => {
        if (reg.active) {
          reg.active.postMessage({
            type: message, 
          });
        } else {
          console.log("Service worker is not active or user data is not available");
        }
      }).catch(err => console.error("ServiceWorker registration error:", err));
    })
  }
};
