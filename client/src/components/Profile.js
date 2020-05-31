import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import requireAuth from './requireAuth';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            bio: "",
            photo: "",
        }
    }

    render() {
        return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span>This is the profile component</span>
                <span>{this.props.auth}</span>
            </div>
        );
    }
}

export default connect(null, actions)(requireAuth(Profile));