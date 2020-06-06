import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUploader from 'react-images-upload';
import Button from './Button';
import * as actions from '../actions';
import requireAuth from './requireAuth';
import "../styles/profile.css";
import "../styles/navbar.css";
import Axios from 'axios';

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

    submitAvatar = async () => {
        const bodyFormData = new FormData();
        bodyFormData.append('avatar', this.state.pictures[0]);
        const response = await Axios.post("http://localhost:3090/users/me/avatar", bodyFormData, {
            headers: {
                "Content-Type": "form-data",
                "Authorization": `Bearer ${this.props.auth}`
            }
        });
        console.log(response);
    }

    arrayBufferToBase64 = (buffer) => {
        let binary = "";
        let bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b));

        return window.btoa(binary);
    };

    generateImageSrc = () => {
        const base64Flag = "data:image/png;base64,";
        const imageString = this.arrayBufferToBase64(this.props.avatar);
        return base64Flag+imageString;
    }


    render() {
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
                        <Button className="profile-signout" text="Sign out" dest="/signout" />
                    </div>
                    <img src={this.generateImageSrc()} alt="random" />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth.authenticated, avatar: state.auth.user.avatar.data }
}

export default connect(mapStateToProps, actions)(requireAuth(Profile));