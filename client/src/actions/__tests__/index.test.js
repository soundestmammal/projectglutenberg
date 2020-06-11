import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fetchUser, signup } from '../index';
import { FETCH_USER, AUTH_USER, AUTH_UUID } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mock = new MockAdapter(axios);

describe('async action creators', () => {
    const store = mockStore({ authenticated: '', uuid: '', errorMessage: '', user: {} });

    afterEach(() => {
        store.clearActions();
    })

    it('should create an action to fetchUser data', () => {
        const userData = { avatar: ['this array of strings is to represent an image'], uuid: "123456" };
        const expectedAction = {
            type: FETCH_USER,
            payload: userData
        }

        mock.onPost("http://localhost:3090/fetchUser").reply(200, userData);

        // return the promise
        return store.dispatch(fetchUser('faketokenhere')).then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual(expectedAction);
        })
    });

    it('should create an action to signup', () => {
        const userData = {
            token: 'it would return a token',
            user: {_id: 'it would return a uuid'}
        };

        mock.onPost("http://localhost:3090/users").reply(200, userData);

        const expectedActions = [
            { type: AUTH_USER, payload: 'it would return a token'},
            { type: AUTH_UUID, payload: 'it would return a uuid'}
        ];
        
        const doNothing = () => {};
        return store.dispatch(signup('email', 'password', doNothing)).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
    });
});