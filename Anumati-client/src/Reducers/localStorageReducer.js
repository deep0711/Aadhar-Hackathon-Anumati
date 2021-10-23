const initialStateLocalStorage = {
    tokenFound: false,
}

const LocalStorageReducer = (state = initialStateLocalStorage , action) => {
    
    switch( action.type ) {
        case 'TOKEN_FOUND' : 
            return { 
                ...state,
                tokenFound: true 
            }
        case 'USER_REGISTER': 
            return {
                ...state, 
                tokenFound: true 
            }
        case 'CREATE_PIN': 
            return {
                ...state,
                tokenFound: true
            }
        default: 
            return {
                ...state
            }
    }
};
export default LocalStorageReducer;