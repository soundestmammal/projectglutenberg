import React from 'react';
import { Link } from "react-router-dom";
import Logo from "./Logo";
import "../styles/landing.css";

const SiteHeader = () => {
    return (
      <div className="nav-wrapper">
        <div className="nav-content">
          <div className="left">
            <Logo />
          </div>

          <div className="right">
            <Link to="/signin" className="login-header">
              Log in
            </Link>
          </div>
        </div>
      </div>
    )
}

export default SiteHeader;