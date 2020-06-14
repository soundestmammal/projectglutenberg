import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import MiniMap from '../MiniMap';
import MiniMarker from '../MiniMarker';

const props = {
    center: {
        lat: 43.39,
        lng: -123.987,
    },
}

describe('MiniMap Component', () => {
    it('should render a MiniMarker component', () => {
        const wrapper = mount(<Router><MiniMap  center={props.center} /></Router>);
        expect(wrapper.find(MiniMarker).length).toEqual(1);
    })
})