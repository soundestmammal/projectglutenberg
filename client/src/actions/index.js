import axios from 'axios';
import { AUTH_USER } from './types';

export const signup = (email, password) => dispatch => {
    axios.post('http://localhost:3090/users', {
        'email': email,
        'password': password
    })
    dispatch({ type: AUTH_USER })
}