import { combineReducers, createStore , applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import LocalStorageReducer from "./localStorageReducer";

const AppReducers = combineReducers({
    userReducer,
    LocalStorageReducer,
});
const rootReducer = (state , action) => {
    return AppReducers(state , action);
}

const Store = createStore(rootReducer , applyMiddleware(thunk));
export default Store;