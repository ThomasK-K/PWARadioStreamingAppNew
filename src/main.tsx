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



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ErrorBoundary>
  </StrictMode>
);
