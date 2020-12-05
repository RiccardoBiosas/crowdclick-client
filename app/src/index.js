import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import  Theme  from "./shared/styles/GlobalThemeProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { toast } from 'react-toastify'

require("dotenv").config();

toast.configure()

ReactDOM.render(
  <Provider store={store}>
    <Theme>
      <App />
    </Theme>
  </Provider>,
  document.getElementById("root")
);