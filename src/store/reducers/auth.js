import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../util';

const initialState = {
    userId: null,
    token: null,
    loading: false,
    error: null,
    redirectPath: '/'
}

const authStart = ( state, action ) => {
    return updateObject(state, {loading: true});
}

const authSuccess = ( state, action ) => {
    return updateObject(state, {
        userId: action.userId,
        token: action.token,
        loading: false,
        error: null
    });
}

const authFailed = ( state, action ) => {
    return updateObject(state, {
        userId: null,
        token: null,
        loading: false,
        error: action.error
    });
}

const authLogout = ( state, action ) => {
    return updateObject(state, {userId: null, token: null});
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { redirectPath: action.path });
}

const reducer = (state = initialState, action) => {

    switch (action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }

}

export default reducer;