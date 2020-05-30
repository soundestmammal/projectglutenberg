import React from 'react';

const Feature = (props) => {
    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span>This is the feature component</span>
            <span>{props.uuid}</span>
            <span>{props.token}</span>
        </div>
    );
}

export default Feature;