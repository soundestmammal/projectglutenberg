import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from '../NavBar';
import List from '../List'
import Root from '../../Root';
import App from '../App';
import NewMap from '../NewMap';

describe('App component should render three components', () => {
    it('shows a navbar', () => {
        const wrapper = mount(<Root><Router><App /></Router></Root>);
        expect(wrapper.find(NavBar).length).toEqual(1);
    });
    
    it('renders a list component', () => {
        const wrapper = mount(<Root><Router><App /></Router></Root>);
        expect(wrapper.find(List).length).toEqual(1);
    });
    
    it('renders a new map component', () => {
        const wrapper = mount(<Root><Router><App /></Router></Root>);
        expect(wrapper.find(NewMap).length).toEqual(1);
    });
});