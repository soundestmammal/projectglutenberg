import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, AUTH_UUID } from './types';

export const signup = (email, password, callback) => async dispatch => {
    try {
        // Mark this as asynchronous
        const response = await axios.post('http://localhost:3090/users', {
            'email': email,
            'password': password
        });
        dispatch({ type: AUTH_USER, payload: response.data.token });
        dispatch({ type: AUTH_UUID, payload: response.data.user._id });
        // dispatch({ type: AUTH_UUID, payload: response.data.use})
        localStorage.setItem('token', response.data.token);
        callback();
    } catch(e) {   
        dispatch({ type: AUTH_ERROR, payload: "Email in use"});
    }
}

export const signout = (token) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/users/logout', {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({ type: AUTH_USER, payload: "" });
        dispatch({ type: AUTH_UUID, payload: "" });
        localStorage.removeItem('token');
        console.log(response.data.text);
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
        console.log("Inside the signin action creator");
        callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: "Invalid Credentials" });
    }
}

export const fetchUser = (token) => async dispatch => {
    try {
        // I need to make a call to the server here to fetch the user information
        // const response = null;

        // @params String token

        // I will get a response, with all of the user data. I would like to have the following:
            /*
                uuid
                avatar
                name
                bio
            */
        //    dispatch({ type: FETCH_USER, payload: response.data.user })
    }
    catch(e) {
        console.log("There was an error here");
    } 
}