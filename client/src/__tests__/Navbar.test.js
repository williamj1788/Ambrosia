import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../components/shared/Navbar';

const props = {
    location:{
        pathname: '/'
    }
}

const component = shallow(<Navbar {...props} />);
const instance = component.instance();

test('componet renders without crashing', () => {
    expect(component).toBeTruthy();
})

test('navbar state is set correctly when above fixed target', () => {
    global.window.scrollY = 401;
    instance.handleScroll();
    expect(component.state().isFixed).toBeTruthy();
    expect(component.state().isHamburgerDropdownOpen).toBeFalsy();
})

test('navbar state is set correctly when below fixed target', () => {
    global.window.scrollY = 399;
    instance.handleScroll();
    expect(component.state().isFixed).toBeFalsy();
})

test('navbar state is set correctly when above hamburger target', () => {
    global.window.innerWidth = 1099;
    instance.handleResize();
    expect(component.state().isHamburger).toBeTruthy();
})

test('navbar state is set correctly when below hamburger target', () => {
    global.window.innerWidth = 1101;
    instance.handleResize();
    expect(component.state().isHamburger).toBeFalsy();
    expect(component.state().isHamburgerDropdownOpen).toBeFalsy();
})