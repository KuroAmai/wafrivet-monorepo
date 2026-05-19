import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./app/globals.css";
import { HerdProviders } from "./providers";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HerdProviders>
      <App />
    </HerdProviders>
  </React.StrictMode>,
);
