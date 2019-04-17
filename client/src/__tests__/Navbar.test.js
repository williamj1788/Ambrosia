import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../components/Navbar';

const component = shallow(<Navbar page={'home'} />);
const instance = component.instance();

test('componet renders without crashing', () => {
    expect(component).toBeTruthy();
})

test('navbar is extend when pass extended target', () => {
    global.window.scrollY = 401;
    instance.handleScroll();
    expect(component.state().isExtended).toBeTruthy();
})

test('navbar is not extend when under extended target', () => {
    global.window.scrollY = 399;
    instance.handleScroll();
    expect(component.state().isExtended).toBeFalsy();
})