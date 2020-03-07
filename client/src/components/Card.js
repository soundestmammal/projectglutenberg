import React from 'react';

const styles = {
    container: {
        backgroundColor: 'white',
        border: '1 px solid black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '200px'
    }
}

const Card = (props) => {
    return(
        <div style={styles.container}>
            <span>{props.name}</span>
            <span>{props.address}</span>
            <span>{props.rating}</span>
        </div>
    )
}

export default Card;