import React from 'react';
import { mount } from 'enzyme';
import Root from '../../Root';
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';
import Business from '../Business';


describe('Business Component', () => {
    const props = {
        photos: [
            "https://s3-media4.fl.yelpcdn.com/bphoto/Gvk-UcKGgsj1U1zj04zIKQ/o.jpg",
            "https://s3-media2.fl.yelpcdn.com/bphoto/gm7uN1ZkmADvSyfZxy8v9g/o.jpg",
            "https://s3-media3.fl.yelpcdn.com/bphoto/R8ZaekKp9-wvS-4a2uLIGw/o.jpg"
        ],
        price: "$",
        name: "Chum Bucket",
        categories: [
            {title: "Patties"},
            {title: "Sewage"},
            {title: "Bucket-based fare"}
        ]
    };

    it('should render a business component', () => {
        const wrapper = mount(<Router><Business rest={props}/></Router>);
        expect(wrapper.find(Business).length).toEqual(1);
    });

    it('should render correct number of photos', () => {
        const wrapper = mount(<Router><Business rest={props} /></Router>);
        expect(wrapper.find(".individual-photo").length).toEqual(props.photos.length + 1);
    })
})