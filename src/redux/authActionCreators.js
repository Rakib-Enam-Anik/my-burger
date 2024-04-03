import * as actionTypes from './actionTypes';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
//import { jwtDecode } from 'jwt-decode';

// Now you can use jwtDecode function



export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}

export const authLoading = isLoading => {
   
    return{
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    }
}

export const authFailed = errMsg => {
    return{
        type: actionTypes.AUTH_FAILED,
        payload: errMsg,
    }
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
       
    }
    
    let authUrl = null;
    if (mode === "Sign Up"){
        authUrl = "http://127.0.0.1:8000/api/users/" ;
    } else {
        authUrl = "http://127.0.0.1:8000/api/token/" ;
    }
    
    axios.post(authUrl, authData)
    .then (response => {
        dispatch(authLoading(false));
        console.log(response);
        const token = jwt_decode(response.data.access)
        console.log(token);
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('userId', token.user_id);
        const expirationTime = new Date(token.exp * 1000);
        localStorage.setItem('expirationTime', expirationTime);
        dispatch(authSuccess(response.data.access, token.user_id));
    })
    .catch(err => {
        dispatch(authLoading(false));
        const key = Object.keys(err.response.data)[0]
        const errorValue = err.response.data[key]

        dispatch(authFailed(`${errorValue}`));
    })
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if(!token) {
        // Logout
        dispatch(logout());
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if(expirationTime <= new Date()) {
            // Logout
            dispatch(logout());
    } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
    }
}

}

