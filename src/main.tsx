import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

console.log("=== Laura Alba Real Estate - Starting Application ===");
console.log("React version:", React.version);
console.log("Document root element:", document.getElementById("root"));

try {
  console.log("About to create React root...");

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>,
  );
  console.log("React app rendered successfully!");
} catch (error) {
  console.error("Error rendering React app:", error);
  console.error("Error stack:", error.stack);
}
