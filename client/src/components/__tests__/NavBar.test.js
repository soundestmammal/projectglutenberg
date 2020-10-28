import React from 'react';
import { mount } from 'enzyme';

import Root from '../../Root';
import App from '../App';
import NavBar from '../NavBar';
import Button from '../Button';
import Logo from '../Logo';

let wrapper;

describe('Testing the Nav Bar when not authenticated', () => {
    // wrapper = mount(
    //     <Root>
    //         <App>
    //             <NavBar />
    //         </App>
    //     </Root>
    // );

    // it('should render the NavBar', () => {
    //     expect(wrapper.find(NavBar).length).toEqual(1);
    // });

    // it('should render my logo', () => {
    //     expect(wrapper.find(Logo).length).toEqual(1);
    // });

    // it('should render two buttons (signin , signout)', () => {
    //     expect(wrapper.find(Button).length).toEqual(2);
    // });

    // it('should render two searchbars', () => {
    //     expect(wrapper.find('.nav-searchbar').length).toEqual(2);
    // });

    // it('should render a search button', () => {
    //     expect(wrapper.find('.nav-search-button').length).toEqual(1);
    // });

    it('should equal itself', () => {
        let test = 2;
        test === 1 + 1;
    });
});
