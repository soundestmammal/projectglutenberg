import React from 'react';
import '../styles/minicard.css';

const MiniCard = (props) => {
    return(
        <div className="mini-container">
            <div className="mini-content">
                <img src={`${props.data.image}`} alt="restaurant" />
                <span className="mini-title">{props.data.name}</span>
                <span className="mini-category">{props.data.categories[0].title}</span> 
            </div>
        </div>
    );
}

export default MiniCard;