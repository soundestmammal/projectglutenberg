import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, AUTH_UUID, FETCH_USER, SIGN_OUT, DELETE_USER } from './types';

export const signup = (email, password, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/users', {
            'email': email,
            'password': password
        });
        dispatch({ type: AUTH_USER, payload: response.data.token });
        dispatch({ type: AUTH_UUID, payload: response.data.user._id });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch(e) {   
        dispatch({ type: AUTH_ERROR, payload: "Email in use"});
    }
}

export const signout = (token) => async dispatch => {
    try {
        await axios.post('http://localhost:3090/users/logout', {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({ type: SIGN_OUT })
        localStorage.removeItem('token');
    } catch(e) {
        console.log("There was an error here");
    }
}

export const signin = (email, password, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/users/login', {
            'email': email,
            'password': password
        });
        dispatch({ type: AUTH_USER, payload: response.data.token });
        dispatch({ type: AUTH_UUID, payload: response.data.user._id });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: "Invalid Credentials" });
    }
}

export const fetchUser = (token) => async dispatch => {
    try {
        // I need to make a call to the server here to fetch the user information
        const response = await axios.post('http://localhost:3090/fetchUser', {}, {
            headers: { 
                "Authorization": `Bearer ${token}`
            }
        });
        // @params String token
        // I will get a response, with all of the user data. I would like to have the following:
            /*
                uuid
                avatar
                name
                bio
            */
        dispatch({ type: FETCH_USER, payload: response.data })
    }
    catch(e) {
        console.log("There was an error here");
    } 
}

export const deleteUser = (token) => async dispatch => {
    try {
        await axios.delete('http://localhost:3090/users/me', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({ type: DELETE_USER });
        localStorage.removeItem('token');
    }
    catch(e) {
        console.log("There was an error in delete user!");
    }
}