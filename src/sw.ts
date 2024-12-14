/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { NetworkOnly, StaleWhileRevalidate } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/.*/, /^\/$/];

// Cache api route in a specific manner 
registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new StaleWhileRevalidate({
    cacheName: "api-cache",
  }),
);

// Dont cache upload route 
registerRoute(
   ({ url }) => url.pathname.startsWith("/uploads/"),
   new NetworkOnly({
      plugins: [],
   }),
   "GET",
);

// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist }),
);

// ---------------------------------------------------------------------------------------------------
// -------------------------------------PUSH NOTIFICATIONS--------------------------------------------
// ---------------------------------------------------------------------------------------------------

let user: any = null;

self.addEventListener("message", (event) => {
  console.log("Message received in SW:", event.data);
  if (event.data && event.data.type === "SET_USER") {
    user = event.data.user;
    console.log("User data set in SW:", user);
  }
});

// function base64UrlToUint8Array(base64tring: string) {
//   const pading = "=".repeat((4 - (base64tring.length % 4)) % 4);
//   const base64 = base64tring.replace(/-/g, "+").replace(/_/g, "/") + pading;
//
//   const rawData = atob(base64);
//   const outputArray = new Uint8Array(rawData.length);
//
//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//
//   return outputArray;
// }

// const saveSubscription = async (subscription: PushSubscription) => {
//   console.log(user);
//
//   if (user) {
//     const res = await fetch("/api/save-subscription", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ subscription: subscription, userId: user.id }),
//     });
//
//     return res.json();
//   } else {
//     console.log(
//       "Cannot subscribe to push notifications as user is not logged in",
//     );
//   }
// };

// self.addEventListener("activate", async () => {
//   const subscription = await self.registration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: base64UrlToUint8Array(
//       "BMY3di6a4MjU7MAZGltwo7K1dCPWpxX9Oyq4lf2e22D4RLtpAvBytLNwcoirHO0UCJqtB8e7jtVI8hQeWGhSQp8", // When generating a new pair of vapid keys, remember to replace this one
//     ),
//   });
//
//   const res = await saveSubscription(subscription);
//   console.log("Push subscription", res);
//
//   const sendNotification = async () => {
//     await fetch("/api/send-notification", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId: user.id }),
//     });
//   };
//
//   sendNotification();
// });

// self.addEventListener("push", (e) => {
//   console.log("Push event", e);
//   console.log("Push event data", e.data);
//
//   if (e.data) {
//     self.registration.showNotification("Test", { body: e.data.text() });
//   }
// });

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

self.skipWaiting();
clientsClaim();
