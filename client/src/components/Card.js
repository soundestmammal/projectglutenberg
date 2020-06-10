import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/card.css";

/* 
    May 26, 2020
    Note to future developer:
        1. These classNames are not acceptable.
        2. Refine the desktop style
        3. Make this work on mobile devices
        4. There may be times where there is no categories!!! Comment out for now, refactor during client side error handing.
*/

const Card = (props) => {
    const {
        image,
        name,
        price,
        phone,
    } = props.rest;
    
    return(
        <Link className="container" to={`/biz/${props.id}`} onMouseEnter={() => props.hover(props.id)} onMouseLeave={() => props.hover("") } onClick={() => props.navigate()}>
            <div className="card-wrapper">
                <div className="image">
                    <img style={{height: '200px', width: '200px'}} src={image} alt="food from restuarant" />
                </div>
                <div className="info">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span className="restaurant-title">{name}</span>
                        <span className="restaurant-title">{props.index}</span>
                    </div>
                    <span>{price}</span>
                    <span>{props.address[0] + " " + props.address[1]}</span>
                    <span>{phone}</span>
                </div>
            </div>
        </Link>
    );
}

export default Card;