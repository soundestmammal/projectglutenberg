import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUploader from 'react-images-upload';
import Axios from 'axios';
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
            pictures: [...picture],
        });
    }

    deleteAccount = () => {
        this.props.deleteUser(this.props.auth.authenticated);
    }

    submitAvatar = async () => {
        const bodyFormData = new FormData();
        bodyFormData.append('avatar', this.state.pictures[0]);
        const response = await Axios.post("http://localhost:3090/users/me/avatar", bodyFormData, {
            headers: {
                "Content-Type": "form-data",
                "Authorization": `Bearer ${this.props.auth.authenticated}`
            }
        });
        console.log("Submit Avatar", response);
        this.props.fetchUser(this.props.auth.authenticated);
    }

    arrayBufferToBase64 = (buffer) => {
        let binary = "";
        let bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b));

        return window.btoa(binary);
    };

    generateImageSrc = () => {
        const base64Flag = "data:image/png;base64,";
        const imageString = this.arrayBufferToBase64(this.props.auth.user.avatar.data);
        return base64Flag+imageString;
    }

    renderAvatar = () => {
        if(this.props.auth.user !== undefined && this.props.auth.user.avatar !== undefined) {
            return <img style={{height: '100px', width: '100px'}}src={this.generateImageSrc()} alt="random" />
        }
        return<div>This is where image will go</div>
    }

    render() {
        console.log(this.props);
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
                        <button onClick={() => this.submitAvatar()}>Save</button>
                        <button>Cancel</button>
                        <button onClick={() => this.deleteAccount()}>Delete Account</button>
                        <Button className="profile-signout" text="Sign out" dest="/signout" />
                    </div>
                    {this.renderAvatar()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth};
}

export default connect(mapStateToProps, actions)(requireAuth(Profile));