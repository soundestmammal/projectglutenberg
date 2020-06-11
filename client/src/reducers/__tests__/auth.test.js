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

it('handles actions of type AUTH_ERROR', () => {
    const errorMessage = "There was an error";
    const action = { type: AUTH_ERROR, payload: errorMessage };
    const newState = authReducer(INITIAL_STATE, action);
    expect(newState.errorMessage).toEqual(errorMessage);
})

it('handles actions of type AUTH_UUID', () => {
    const uuid = 'fdoiwhfoiiwoijfeonwofe';
    const action = { type: AUTH_UUID, payload: uuid };
    const newState = authReducer(INITIAL_STATE, action);
    expect(newState.uuid).toEqual(uuid);
})

it('handles actions of type FETCH_USER', () => {
    const user = { uuid: 'fidwqn09ej0', avatar: []};
    const action = { type: FETCH_USER, payload: user }
    const newState = authReducer(INITIAL_STATE, action);
    expect(newState.user).toEqual(user);
});

it('handles actions of type SIGN_OUT', () => {
    const emptyStateObject = {};
    const action = { type: SIGN_OUT };
    const newState = authReducer(INITIAL_STATE, action);
    expect(newState).toEqual(emptyStateObject);
})

it('handles actions of unknown type', () => {
    const newState = authReducer(INITIAL_STATE, { type: 'dfhsoiahfhwhewnfwionfw8' });
    expect(newState).toEqual(INITIAL_STATE);
});