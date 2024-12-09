import { combineReducers } from "redux";
import authReducer from "./auth.js";
export default combineReducers({
    Auth: authReducer,
})