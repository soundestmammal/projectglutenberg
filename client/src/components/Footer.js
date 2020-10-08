import React from "react";
import { ReactComponent as Statue } from "../icons/statue-of-liberty.svg";
import { ReactComponent as Instagram } from "../icons/logo-instagram.svg";
import { ReactComponent as Facebook } from "../icons/logo-facebook.svg";
import { ReactComponent as Linkedin } from "../icons/logo-linkedin.svg";

import Emoji from "./Emoji";
import "../styles/footer.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-location-container">
          <span>
            Oasis is made with <Emoji symbol="☕" /> + <Emoji symbol="❤️" /> in
            New York
          </span>
          <Statue className="statue" />
        </div>
        <div className="footer-media-container">
          <span className="footer-copyright">© 2020 Oasis</span>
          <div className="social-media-container">
            <Instagram className="social-media-icon" />
            <Facebook className="social-media-icon" />
            <Linkedin className="social-media-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
