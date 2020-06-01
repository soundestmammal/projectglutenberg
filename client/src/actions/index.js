import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (email, password, callback) => async dispatch => {
    try {
        // Mark this as asynchronous
        const response = await axios.post('http://localhost:3090/users', {
            'email': email,
            'password': password
        });
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch(e) {   
        dispatch({ type: AUTH_ERROR, payload: "Email in use"});
    }
}

export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ""
    }
}

export const signin = (email, password, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/users/login', {
            'email': email,
            'password': password
        });
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        console.log("Inside the signin action creator");
        callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: "Invalid Credentials" });
    }
}