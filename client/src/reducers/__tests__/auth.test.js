import authReducer from '../auth';
import { FETCH_USER } from '../../actions/types';

const INITIAL_STATE = {
    authenticated: '',
    errorMessage: '', 
    uuid: '',
    user: {}
}

it('handles actions of type FETCH_USER', () => {

    const user = { uuid: 'fidwqn09ej0', avatar: []};
    const action = {
        type: FETCH_USER,
        payload: user
    }

    const newState = authReducer(INITIAL_STATE, action);
    expect(newState.user).toEqual(user);
});

it('handles actions of unknown type', () => {
    const newState = authReducer(INITIAL_STATE, { type: 'dfhsoiahfhwhewnfwionfw8' });
    expect(newState).toEqual(INITIAL_STATE);
});