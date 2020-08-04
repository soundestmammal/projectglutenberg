import React from 'react';
import { Link } from 'react-router-dom';
import Score from './Score';
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
                    <img src={image} alt="food from restuarant" />
                </div>
                <div className="info">
                    <span className="restaurant-title">{name}</span>
                    <span className="card-price">{price}</span>
                    <span className="card-address">{props.address[0]}</span>
                    <span className="card-address">{props.address[1]}</span>
                    <span className="card-phone">{phone}</span>
                </div>
                <div className="score-wrapper">
                    <Score 
                        score={props.rest.score}
                    />
                </div>
                <span className="restaurant-title">{props.index}</span>
            </div>
        </Link>
    );
}

export default Card;