import React, { Component } from 'react';
import Card from './Card';
import "../styles/list.css";

class List extends Component {
    // Render List is a function that goes through the data and returns a list
    // of cards that show information about the nearby restaurants.
    renderList = () => {
        const listItems = this.props.restaurants.map((rest, index) => {
            return <Card image={rest.image} name={rest.name} address={rest.location} price={rest.price} phone={rest.phone} categories={rest.categories} key={rest.id} id={rest.id} hover={this.props.hover} navigate={this.props.navigate} index={index+1} />
        })

        return <ul className="listStyling">{listItems}</ul>
    }

    render() {
        return (
            <div className="list-container">
                {this.renderList()}
            </div>
        );
    }
}

export default List;