
const initialUserState = {
    userLogedIn: false,
    name: null,
    aadharCardNumber: null,
    address: null,
    mPin: null,
}

const userReducer = (state = initialUserState , action) => {
    switch( action.type ) {
        case 'USER_REGISTER': 
            return {
                ...state,
                aadharCardNumber: action.aadharData,
            }
        case 'CREATE_PIN': 
            return {
                ...state,
                userLogedIn: true,
                mPin: action.pin
            }
        case 'TOKEN_FOUND': 
            return {
                ...state,
                aadharCardNumber: action.aNumber,
                mPin: action._mPin
            }
        default: 
            return {
                ...state
            }
    }
}
export default userReducer;