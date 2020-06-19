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

    function renderSafetyStyling() {
        if(props.rest.score === 0) {
            return "card-wrapper-danger"
        } else if (props.rest.score === 1) {
            return "card-wrapper-caution";
        } else {
            return "card-wrapper-safe"
        }
    }
    
    return(
        <Link className="container" to={`/biz/${props.id}`} onMouseEnter={() => props.hover(props.id)} onMouseLeave={() => props.hover("") } onClick={() => props.navigate()}>
            <div className={renderSafetyStyling()}>
                <div className="image">
                    <img style={{height: '200px', width: '200px'}} src={image} alt="food from restuarant" />
                </div>
                <div className="info">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span className="restaurant-title">{name}</span>
                        <span className="restaurant-title">{props.index}</span>
                    </div>
                    <span className="card-price">{price}</span>
                    <span className="card-address">{props.address[0]}</span>
                    <span className="card-address">{props.address[1]}</span>
                    <span className="card-phone">{phone}</span>
                </div>
                <div className="score-wrapper">
                    <Score 
                        score={props.rest.score}
                    />
                    <span className="score-grade">95</span>
                    <span>Dedicated GF Menu</span>
                </div>
            </div>
        </Link>
    );
}

export default Card;