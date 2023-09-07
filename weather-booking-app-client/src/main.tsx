import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ApiService from "./endpoint-caller/apiService";

const container = document.getElementById("root");
const root = createRoot(container!);
ApiService.initialise();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
