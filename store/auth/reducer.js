import { actionTypes } from './action';

export const initState = {
    isLoggedIn: false,
    accessToken: '',
    user: {},
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            window.localStorage.setItem('ikimina', JSON.stringify({data:action.data.data,accessToken:action.data.accessToken}));
            return {
                ...state,
                ...{ user: action.data },
                ...{ accessToken: action.accessToken },
                ...{ isLoggedIn: true },
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...{ user: action.data },
                ...{ accessToken: action.accessToken },
                ...{ isLoggedIn: true },
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                ...{ isLoggedIn: false },
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                ...{ isLoggedIn: false },
            };
        default:
            return state;
    }
}

export default reducer;
