// constants
import { NAV_AUTH_TRUE, NAV_AUTH_FALSE } from './navAuthActions'
// utils
import { getUserAddressFromLocalStorage } from '../../utils'

const initialState = {
  isNavAuth: getUserAddressFromLocalStorage()
}

export const navAuthReducer = (state=initialState, action) => {
  switch (action.type) {
    case NAV_AUTH_TRUE:
      return { ...state, isNavAuth: true }
    case NAV_AUTH_FALSE:
      return { ...state, isNavAuth: false }
    default:
      return state
  }
}
