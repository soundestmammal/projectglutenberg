import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Signout extends Component {

    componentDidMount() {
        this.props.signout();
    }

    render() {
        console.log(this.props.auth);
        return <div>Sorry to see you go!</div>;
    }
}

function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(Signout);