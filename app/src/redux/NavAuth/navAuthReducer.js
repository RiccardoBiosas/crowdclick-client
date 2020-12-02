import { SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY } from "../../utils/blockchain/constants";
import { NAV_AUTH_TRUE, NAV_AUTH_FALSE } from "./navAuthActions";

const initialState = {
    isNavAuth: window.localStorage.getItem(SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY) ? true : false
}

export const navAuthReducer = (state, action) => {
    switch(action.type) {
        case NAV_AUTH_TRUE:
            return {...state, isNavAuth: true}
        case NAV_AUTH_FALSE:
            return {...state, isNavAuth: false}
        default:
            return initialState
    }
}