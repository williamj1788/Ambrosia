import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../components/Navbar';

const component = shallow(<Navbar page={'home'} />);
const instance = component.instance();

test('componet renders without crashing', () => {
    expect(component).toBeTruthy();
})

test('navbar is extend when above extended target', () => {
    global.window.scrollY = 401;
    instance.handleScroll();
    expect(component.state().isExtended).toBeTruthy();
})

test('navbar is not extend when below extended target', () => {
    global.window.scrollY = 399;
    instance.handleScroll();
    expect(component.state().isExtended).toBeFalsy();
})

test('navbar shows hamburger when above hamburger target', () => {
    global.window.innerWidth = 1099;
    instance.handleResize();
    expect(component.state().isHamburger).toBeTruthy();
})

test('navbar does not shows hamburger when below hamburger target', () => {
    global.window.innerWidth = 1101;
    instance.handleResize();
    expect(component.state().isHamburger).toBeFalsy();
})