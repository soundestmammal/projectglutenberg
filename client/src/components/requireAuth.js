import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default (ChildComponent) => {
    class ComposedComponent extends Component {

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
            return <ChildComponent {...this.props} />;
        }

    }

    function mapStateToProps(state) {
        return { auth: state.auth.authenticated }
    }

    return withRouter(connect(mapStateToProps)(ComposedComponent));
};

// Where should I access the redux store? pull out auth property
// How how to access the history prop and move users around