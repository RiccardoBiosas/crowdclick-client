import { LIGHT_MODE, DARK_MODE } from "./themeModeActions"

const initialState = {
    screenTheme: "light"
}

export const themeModeReducer = (state = initialState, action) => {
    switch(action.type) {
        case LIGHT_MODE:
            return {...state, screenTheme: "light"}
            break
        case DARK_MODE:
            return {...state, screenTheme: "dark"}
            break
        default:
            return state
    }
    
}