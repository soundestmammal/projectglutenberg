import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

class Profile extends Component {
    state = { name: '' };

    // Our component just got rendered
    componentDidMount() {
        this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
        this.shouldNavigateAway();
    }

    shouldNavigateAway() {
        if(!this.props.auth) {
            console.log("I need to leave!");
            this.props.history.push('/');
        }
    }

    render() {
        return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span>This is the profile component</span>
                <span>{this.props.uuid}</span>
                <span>{this.props.token}</span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
}

export default withRouter(connect(mapStateToProps, actions)(Profile));