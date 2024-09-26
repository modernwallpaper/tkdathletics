import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/auth.context.tsx";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/app/theme-provider.tsx";
import { ConnectionProvider } from "./context/connection.context.tsx";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

console.log("V. 1.0.7");

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then(function() {
    navigator.serviceWorker.ready.then((reg) => {
      const user = localStorage.getItem("user");
      console.log(user);

      if (user && reg.active) {
        reg.active.postMessage({
          type: 'SET_USER',
          user: JSON.parse(user), 
        });
      } else {
        console.log("Service worker is not active or user data is not available");
      }
    }).catch(err => console.error("ServiceWorker registration error:", err));
  })
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConnectionProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </ThemeProvider>
    </ConnectionProvider>
  </React.StrictMode>,
);
