import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Business from '../Business';
import Loading from '../Loading';
import MiniMap from '../MiniMap';

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
        ],
        hours: [{
            open: [
                { day: 0, start: "0900", end: "1700" },
                { day: 1, start: "0900", end: "1700" },
                { day: 2, start: "0900", end: "1700" },
                { day: 3, start: "0900", end: "1700" },
                { day: 4, start: "0900", end: "1700" },
                { day: 5, start: "0900", end: "1700" },
                { day: 6, start: "0900", end: "1700" },
                ],
            is_open_now: true,
            }],
        coordinates: {
            latitude: 40.6747704759645,
            longitude: -73.5099110118665 
        },
        location: {
            display_address: [
                "1847 Wantagh Ave",
                "Wantagh, NY 11793"
            ]
        }
    };

    it('should render a business component', () => {
        const wrapper = mount(<Router><Business rest={props}/></Router>);
        expect(wrapper.find(Business).length).toEqual(1);
    });

    it('should render correct number of photos', () => {
        const wrapper = mount(<Router><Business rest={props} /></Router>);
        expect(wrapper.find(".individual-photo").length).toEqual(props.photos.length + 1);
    });

    it('should render each restaurant photo in correct order 0,1,2,0', () => {
        const wrapper = mount(<Router><Business rest={props} /></Router>);
        expect(wrapper.find(".individual-photo").at(0).prop("src")).toEqual(props.photos[0]);
        expect(wrapper.find(".individual-photo").at(1).prop("src")).toEqual(props.photos[1]);
        expect(wrapper.find(".individual-photo").at(2).prop("src")).toEqual(props.photos[2]);
        expect(wrapper.find(".individual-photo").at(3).prop("src")).toEqual(props.photos[0]);
    });

    it('should show the correct title', () => {
        const wrapper = mount(<Router><Business rest={props}/></Router>);
        expect(wrapper.find(".business-title").render().text()).toEqual(props.name);
    });

    it('should render the correct price', () => {
        const wrapper = mount(<Router><Business rest={props} /></Router>);
        expect(wrapper.find(".business-price").render().text()).toEqual(props.price);
    })

    it('should show the properly formatted category string', () => {
        const wrapper = mount(<Router><Business rest={props} /></Router>);
        expect(wrapper.find(".business-categories").render().text()).toEqual(props.categories[0].title + ", " + props.categories[1].title + ", " + props.categories[2].title);
    });

    it("should render the Loading component when rest property is null", () => {
        const wrapper = mount(<Router><Business rest={null} /></Router>);
        expect(wrapper.find(Loading).length).toEqual(1);
    });

    it("should render the correct day of week", () => {
        const wrapper = mount(<Router><Business rest={props} /></Router>);
        expect(wrapper.find(".hours-day").at(0).render().text()).toEqual("Mon");
        expect(wrapper.find(".hours-day").at(1).render().text()).toEqual("Tue");
        expect(wrapper.find(".hours-day").at(2).render().text()).toEqual("Wed");
        expect(wrapper.find(".hours-day").at(3).render().text()).toEqual("Thu");
        expect(wrapper.find(".hours-day").at(4).render().text()).toEqual("Fri");
        expect(wrapper.find(".hours-day").at(5).render().text()).toEqual("Sat");
        expect(wrapper.find(".hours-day").at(6).render().text()).toEqual("Sun");
    });

    it("should render the correct open time", () => {
        const wrapper = mount(<Router><Business rest={props} /></Router>);
        expect(wrapper.find(".hours-time").at(0).render().text()).toEqual("9:00 AM");
    });

    it("should render the correct close time", () => {
        const wrapper = mount(<Router><Business rest={props} /></Router>);
        expect(wrapper.find(".hours-time").at(1).render().text()).toEqual("5:00 PM");
    });

    it("should render the text 'open now' if it is open now", () => {
        const wrapper = mount(<Router><Business rest={props} /></Router>);
        expect(wrapper.find(".open-now").length).toEqual(1);
        expect(wrapper.find(".open-now").at(0).render().text()).toEqual("Open now!!!");
    });

    it("should render a <MiniMap />", () => {
        const wrapper = mount(<Router><Business rest={props} /></Router>);
        expect(wrapper.find(MiniMap).length).toEqual(1);
    });

    it("should render the address", () => {
        const wrapper = mount(<Router><Business rest={props} /></Router>);
        expect(wrapper.find(".business-address").render().find('span').length).toEqual(2);
    })
});