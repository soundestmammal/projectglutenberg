import authReducer from '../auth';
import { FETCH_USER } from '../../actions/types';

it('handles actions of type FETCH_USER', () => {

    const INITIAL_STATE = {
        authenticated: '',
        errorMessage: '', 
        uuid: '',
        user: {}
    }

    const user = { uuid: 'fidwqn09ej0', avatar: []};
    const action = {
        type: FETCH_USER,
        payload: user
    }

    const newState = authReducer(INITIAL_STATE, action);
    expect(newState.user).toEqual(user);
});