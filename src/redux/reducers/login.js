import {SET_LOGIN} from "../actions/actionTypes";

let userName = localStorage.getItem('user_name');
let userId = localStorage.getItem('user_id');
let userToken = localStorage.getItem('user_token')

const initialState = {
    stateUserName: userName ? userName : "",
    stateUserId: userId ? userId : "",
    stateUserToken: userToken ? userToken : ""
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN:{
            //here can be additional code
            localStorage.setItem("user_name", action.data.name);
            localStorage.setItem("user_id", action.data.id);
            localStorage.setItem("user_token", action.data.token);
            return {
                ...state,
                stateUserName: action.data.name,
                stateUserId: action.data.id,
                stateUserToken: action.data.token
            };
        }
        default:
            return state;
    }
}

export default login;