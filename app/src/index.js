import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import  Theme  from "./shared/styles/GlobalThemeProvider";
// import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from 'web3-react'

require("dotenv").config();

// function getLibrary(provider) {
//   const library = new Web3Provider(provider)
//   library.pollingInterval = 12000
//   return library
// }

// const App = () => {
//   return (
//     <Web3ReactProvider getLibrary={getLibrary}>
//       <AppA />
//     </Web3ReactProvider>
//   )
// }

ReactDOM.render(
  <Provider store={store}>
     {/* <Web3ReactProvider getLibrary={getLibrary}> */}
    <Theme>
      <App />
    </Theme>
    {/* </Web3ReactProvider> */}
  </Provider>,
  document.getElementById("root")
);
