import React from "react";
import { ReactComponent as OasisLogo } from "../icons/palm.svg";
import "../styles/logo.css";

const Logo = () => {
  return (
    <div className="logo-container">
      <OasisLogo className="logo-palm" />
      <span className="logo-text">Oasis</span>
    </div>
  );
};

export default Logo;
