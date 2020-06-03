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
    return(
        <Link className="container" to={`/biz/${props.id}`} onMouseEnter={() => props.hover(props.id)} onClick={() => props.navigate()}>
            <div className="card-wrapper">
                <div className="image">
                    <img style={{height: '200px', width: '200px'}} src={props.image} alt="food from restuarant" />
                </div>
                <div className="info">
                    <span className="restaurant-title">{props.name}</span>
                    <span>{props.price}</span>

                    {/* <span>{props.categories[0].title}</span> */}
                    <span>{props.address[0] + " " + props.address[1]}</span>
                    <span>{props.rating}</span>
                    <span>{props.phone}</span>
                </div>
            </div>
        </Link>
    );
}

export default Card;