import React from 'react';
import '../styles/header.css'

const Header = () => {
    return (
        <div className="header">
            <div className="left-header">
                <h3>Project Glutenberg</h3>
            </div>
            <div className="right-header">
                <div className="empty-filler">
                    .
                </div>
                <div className="auth-header">
                    <h5>Log in</h5>
                    <h5>Sign up</h5>
                </div>
            </div>
        </div>
    )
}


export default Header;