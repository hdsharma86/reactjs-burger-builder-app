import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = ( token, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

const authTimeout = ( expirationTime ) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const logout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiresIn');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const auth = (username, password, isSignup) => {

    const authData = {
        email: username,
        password: password,
        returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRqDOoknvbkyhXOMHhovVfa_PMZgbTk6I';
    if(!isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRqDOoknvbkyhXOMHhovVfa_PMZgbTk6I';
    }

    return dispatch => {

        axios.post(url, authData)
        .then((response) => {

            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expiresIn', expirationDate);

            dispatch(authSuccess( response.data.idToken, response.data.localId ));
            dispatch(authTimeout(response.data.expiresIn));
        })
        .catch((error) => {
            dispatch(authFailed(error.response.data.error));
        });
        dispatch(authStart());

    }

}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            const expirationTime = new Date(localStorage.getItem('expiresIn'));
            if(expirationTime <= new Date()){
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, userId));
                dispatch(authTimeout( (expirationTime.getTime() - new Date().getTime())/1000 ));
            }           
        }        
    };
}