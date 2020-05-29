import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/button.css";

const Button = (props) => {
    return(
        <Link style={{textDecoration: 'none'}} className={props.className} to={props.dest} >
            <div className="button" onClick={props.submit}>
                {props.text}
            </div>
        </Link>
    );
}

export default Button;