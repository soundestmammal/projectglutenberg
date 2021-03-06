import { AUTH_USER, AUTH_ERROR, AUTH_UUID, FETCH_USER, SIGN_OUT, DELETE_USER } from '../actions/types';

const INITIAL_STATE = {
    authenticated: '',
    errorMessage: '', 
    uuid: '',
    user: {}
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, authenticated: action.payload };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        case AUTH_UUID:
            return { ...state, uuid: action.payload };
        case FETCH_USER:
            return { ...state, user: action.payload };
        case SIGN_OUT:
            return {};
        case DELETE_USER:
            return {};
        default:
            return state;
    }
}