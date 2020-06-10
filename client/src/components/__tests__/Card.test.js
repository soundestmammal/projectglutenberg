import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Card from '../Card';

let rest = {
        "name": "Chipotle Mexican Grill",
        "coordinates": {
            "latitude": 40.693723,
            "longitude": -73.5089548185591
        },
        "location": [
            "1194 Wantagh Ave",
            "Wantagh, NY 11793"
        ],
        "image": "https://s3-media2.fl.yelpcdn.com/bphoto/k2Vh4K7j3tP2vcFa_yhYMA/o.jpg",
        "price": "$",
        "phone": "+15166796958",
        "categories": [
            {
                "alias": "hotdogs",
                "title": "Fast Food"
            },
            {
                "alias": "mexican",
                "title": "Mexican"
            }
        ],
        "id": "VdmoLKXwKLVh7GTYNWAT8A"
};

describe('Testing the UI of the Card component', () => {
    it('renders the card component', () => {
        const wrapper = shallow(
            <Router>
                <Card 
                    rest={rest}
                    address={rest.location}
                />
            </Router>
        );
        expect(wrapper.exists(Card)).toBe(true);
    });
});