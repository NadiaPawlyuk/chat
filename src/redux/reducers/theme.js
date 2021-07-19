import {SET_SITE_THEME} from "../actions/actionTypes";


let themeBool = localStorage.getItem('site_theme');

const initialState = {
    siteTheme: themeBool ? themeBool : "light"
};

const theme = (state = initialState, action) => {
    switch (action.type) {
        case SET_SITE_THEME:{
            //here can be additional code
            localStorage.setItem("site_theme", action.data);
            return {
                ...state,
                siteTheme: action.data
            };
        }
        default:
            return state;
    }
}

export default theme;