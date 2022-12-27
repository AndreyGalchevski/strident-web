import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import GlobalStyles from "./GlobalStyle";
import { APP_ROOT_ID } from "./utils/constants";

import "react-loading-skeleton/dist/skeleton.css";

const root = ReactDOM.createRoot(
  document.getElementById(APP_ROOT_ID) as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
