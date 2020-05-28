import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/button.css";

const Button = (props) => {
    return(
        <Link style={{textDecoration: 'none'}} className={props.className}>
            <div className="button">
                {props.text}
            </div>
        </Link>
    );
}

export default Button;