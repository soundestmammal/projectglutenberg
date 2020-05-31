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