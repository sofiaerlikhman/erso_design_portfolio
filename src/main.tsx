// main.tsx: The very first file that runs. It doesn't contain any of
// the site's actual design — its only job is to find the empty <div
// id="root"> in index.html and tell React "render the whole App
// component tree inside here." Every other file in src/ ultimately
// gets included because App.tsx (and everything it imports) is rendered
// from this one starting point.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // StrictMode is a development-only helper from React that double-runs
  // some code on purpose, to help catch subtle bugs early. It doesn't
  // affect what visitors actually see or how the site behaves once
  // built for production.
  <StrictMode>
    <App />
  </StrictMode>,
);
