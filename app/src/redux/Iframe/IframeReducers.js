import { IFRAME_FULL_SCREEN, IFRAME_NORMAL_SIZE } from "./IframeActions"

const initialVisibilityState = {
    full_screen: false
}
export const IFrameVisibilityReducer = (state = initialVisibilityState, action) => {
    switch(action.type) {
        
        case IFRAME_FULL_SCREEN:
            return {...state, full_screen: true}
        case IFRAME_NORMAL_SIZE:
            return {...state, full_screen: false}
        default:
            return state
    }
}