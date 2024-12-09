import {LOGIN_SUCCESS,LOGOUT_SUCCESS} from "../../shared/constants/action-type";

const initState = {
    user:{},
}

export default (state = initState,action) =>{
    switch(action.type){
        case LOGIN_SUCCESS:
            return {...state, user: action.payload}
        case LOGOUT_SUCCESS:
            return {...state, user: {}}
        default:
            return state;
    }
}