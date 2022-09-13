import { render } from "react-dom";
import "./styles.css";

import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("rootElement not found");

render(<App />, rootElement);
