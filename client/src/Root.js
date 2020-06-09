import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(
    reducers,
    { 
      auth: { authenticated: localStorage.getItem('token') }
    },
    applyMiddleware(reduxThunk)
  );

export default (props) => {
    return(
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};