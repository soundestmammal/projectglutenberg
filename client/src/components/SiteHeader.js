import React from 'react';
import { Menu } from 'antd';
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
            <Link to="/signin" className="login">
              Log in
            </Link>
            <Link to="/auth" className="get-started">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    )
}

export default SiteHeader;