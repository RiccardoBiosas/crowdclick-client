import React from "react";
import ReactDOM from "react-dom";
import 'normalize.css'
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import './index.css'
import { Theme } from "./shared/GlobalThemeProvider";
require("dotenv").config();

ReactDOM.render(
  <Provider store={store}>
    <Theme>
      <App />
    </Theme>
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <div style={{width: "100vw"}}>hi</div>,
//   document.getElementById('root')
// )
