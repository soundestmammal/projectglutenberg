import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUploader from 'react-images-upload';
import Button from './Button';
import * as actions from '../actions';
import requireAuth from './requireAuth';
import "../styles/profile.css";
import "../styles/navbar.css";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            bio: "",
            pictures: [],
        }
    }

    onDrop = (picture) => {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render() {
        console.log(this.state);
        return(
            <div className="profile-wrapper">
                <div className="profile-content-container">
                    <div className="profile-content">
                        <div className="profile-left">
                            <span className="profile-name">Enter your name</span>
                            <span>Enter a short bio</span>
                        </div>
                        <div className="profile-image">
                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose image'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                            />
                        </div>
                    </div>
                    <div className="profile-buttons">
                        <button>Save</button>
                        <button>Cancel</button>
                        <Button className="profile-signout" text="Sign out" dest="/signout" />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(requireAuth(Profile));