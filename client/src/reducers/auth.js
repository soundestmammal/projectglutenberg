import { AUTH_USER, AUTH_ERROR, AUTH_UUID } from '../actions/types';

const INITIAL_STATE = {
    authenticated: '',
    errorMessage: '', 
    uuid: '',
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, authenticated: action.payload };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        case AUTH_UUID:
            return { ...state, uuid: action.payload };
        default:
            return state;
    }
}