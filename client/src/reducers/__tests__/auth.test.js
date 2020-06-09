import authReducer from '../auth';
import { AUTH_USER, AUTH_ERROR, AUTH_UUID, FETCH_USER, SIGN_OUT } from '../../actions/types';

const INITIAL_STATE = {
    authenticated: '',
    errorMessage: '', 
    uuid: '',
    user: {}
}

it('handles actions of type AUTH_USER', () => {
    const token = "jfdnsaofenwonfeoiwhfhf98h298hf9h4938hf4398hf3";
    const action = { type: AUTH_USER, payload: token };
    const newState = authReducer(INITIAL_STATE, action);
    expect(newState.authenticated).toEqual(token);
});

it('handles actions of type FETCH_USER', () => {

    const user = { uuid: 'fidwqn09ej0', avatar: []};
    const action = { type: FETCH_USER, payload: user }
    const newState = authReducer(INITIAL_STATE, action);
    expect(newState.user).toEqual(user);
});

it('handles actions of unknown type', () => {
    const newState = authReducer(INITIAL_STATE, { type: 'dfhsoiahfhwhewnfwionfw8' });
    expect(newState).toEqual(INITIAL_STATE);
});