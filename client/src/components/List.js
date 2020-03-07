import React, { Component } from 'react';
import Card from './Card';
import "../styles/list.css";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [
                {
                    name: "Chipotle",
                    address: "El Camino Real, Mountain View",
                    rating: '2/5'
                },
                {
                    name: "Whole Foods Market",
                    address: "El Camino Real, Los Altos",
                    rating: "4/5"
                },
                {
                    name: "Taco Truck",
                    address: "El Camino Real, Mountain View",
                    rating: "4/5"
                },
                {
                    name: "The Kitchen",
                    address: "1400 Villa Street, Mountain View",
                    rating: "4/5"
                },
                {
                    name: "In-n-Out",
                    address: "El Camino Real, Mountain View",
                    rating: "4/5"
                }
            ]
        }
    }

    // Render List is a function that goes through the data and returns a list
    // of cards that show information about the nearby restaurants.
    renderList = () => {
        const listItems = this.state.places.map((element) => {
            return <Card name={element.name} address={element.address} rating={element.rating} />
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