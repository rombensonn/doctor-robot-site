import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";

const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById("root")!;
const hasPrerenderedHtml = root.innerHTML.trim().length > 0 && !root.innerHTML.includes("app-html");

if (hasPrerenderedHtml) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
