import React from 'react';
import { mount } from 'enzyme';
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
        const wrapper = mount(<Router><Card rest={rest} address={rest.location} /></Router>);
        expect(wrapper.exists(Card)).toBe(true);
    });

    it('renders only a single image', () => {
        const wrapper = mount(<Router><Card rest={rest} address={rest.location} /></Router>);
        expect(wrapper.find("img").length).toEqual(1);
    });

    it('renders the image that is provided by props', () => {
        const wrapper = mount(<Router><Card rest={rest} address={rest.location} /></Router>);
        expect(wrapper.find("img").prop("src")).toEqual(rest.image);
    });

    it('renders the correct restaurant name', () => {
        const wrapper = mount(<Router><Card rest={rest} address={rest.location} /></Router>);
        expect(wrapper.find(".restaurant-title").at(0).render().text()).toEqual(rest.name);
    });

    it('renders the correct restaurant number', () => {
        const wrapper = mount(<Router><Card rest={rest} address={rest.location} index={1} /></Router>);
        expect(wrapper.find(".restaurant-title").at(1).render().text()).toEqual("1");
    })

    it('renders the correct price', () => {
        const wrapper = mount(<Router><Card rest={rest} address={rest.location} /></Router>);
        expect(wrapper.find(".card-price").render().text()).toEqual(rest.price);
    });

    it('renders the correct address', () => {
        const matchMe = rest.location[0] + " " + rest.location[1];
        const wrapper = mount(<Router><Card rest={rest} address={rest.location} /></Router>);
        expect(wrapper.find(".card-address").render().text()).toEqual(matchMe);
    })

    it('renders the correct phone number', () => {
        const wrapper = mount(<Router><Card rest={rest} address={rest.location} /></Router>);
        expect(wrapper.find(".card-phone").render().text()).toEqual(rest.phone);
    });
});