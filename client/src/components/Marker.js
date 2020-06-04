import React, { Component } from 'react';
import MiniCard from './MiniCard';

class Marker extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    } 

    toggleActive = (bool) => {
        console.log("You are hovering over ", this.props.text);
        this.setState({ active: bool })
    }

    render() {
        if(this.state.active){
            return(
                <div className="marker-wrapper">
                    <MiniCard data={this.props.data} />
                    <div className="pin-highlighted" onMouseEnter={ () => this.toggleActive(true) } onMouseLeave={ () => this.toggleActive(false) }>
                        <div className="marker-content">
                            {this.props.text}
                        </div>
                    </div>
                </div>
            );
        }
        return(
            <div className={this.props.className} onMouseEnter={ () => this.toggleActive(true) } onMouseLeave={ () => this.toggleActive(false)}>
                <div className="marker-content">
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default Marker;