
const initialState = {
    colorStyle: "ethereumStyle"
}

export const currencyStyleReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case "ethereum":       
            return Object.assign({}, state, {colorStyle: "ethereumStyle"});
        case "aeternity":      
            return Object.assign({}, state, {colorStyle: "aeternityStyle"});
        default:
            return initialState
    }
}

