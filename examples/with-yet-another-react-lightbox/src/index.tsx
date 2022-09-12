import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import "./styles.css";

import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("rootElement not found");

const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
