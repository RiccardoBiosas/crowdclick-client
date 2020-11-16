import { createStore, combineReducers } from "redux";
import { currencyStyleReducer } from "./CurrencyStyle/currencyStyleReducers";
import { IFrameVisibilityReducer } from "./Iframe/IframeReducers";
import { themeModeReducer } from "./ThemeMode/themeModeReducer";
import { navAuthReducer } from "./NavAuth/navAuthReducer";
import ethereumContractReducer from './ethereumContract/reducers'

const rootReducer = combineReducers({
  currencyStyleReducer,
  IFrameVisibilityReducer,
  themeModeReducer,
  navAuthReducer,
  ethereumContractReducer
})

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
