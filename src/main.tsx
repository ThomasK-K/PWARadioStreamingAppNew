import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "./components/ErrorBoundary";
import { cleanupInvalidStorageItems } from "./utils/storageUtils";

// Cleanup any invalid localStorage items before app initialization
cleanupInvalidStorageItems();

// Benutzerdefiniertes Event für App-Updates
// const swUpdateEvent = new Event("sw-update-available");

// Service Worker für PWA registrieren


// @ts-ignore - Ignoriere die Warnung für updateSW
console.log("Service Worker registriert:", !!updateSW);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ErrorBoundary>
  </StrictMode>
);
