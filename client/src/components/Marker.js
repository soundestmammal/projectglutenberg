import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniCard from './MiniCard';

class Marker extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    } 

    toggleActive = (bool) => {
        // console.log("You are hovering over ", this.props.text);
        this.setState({ active: bool })
        if(bool) {
            this.props.hover(this.props.data.id);
        } else {
            this.props.hover("");
        }
    }

    render() {
        if(this.state.active){
            return(
                <Link to={`/biz/${this.props.data.id}`}>
                <div className="marker-wrapper">
                    <MiniCard data={this.props.data} />
                    <div className="pin-highlighted" onMouseEnter={ () => this.toggleActive(true) } onMouseLeave={ () => this.toggleActive(false) } onClick={ () => this.props.navigate() } >
                        <div className="marker-content">
                            {this.props.text}
                        </div>
                    </div>
                </div>
                </Link>
            );
        }
        return(
            <div className={this.props.className} onMouseEnter={ () => this.toggleActive(true) } onMouseLeave={ () => this.toggleActive(false)} onClick={() => console.log("you clicked me")}>
                <div className="marker-content">
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default Marker;