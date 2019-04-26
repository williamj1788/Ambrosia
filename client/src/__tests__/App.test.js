import React from 'react';
import { shallow } from 'enzyme';
import { App, RedirectToMenuProduct } from "../App";
import { Redirect } from 'react-router-dom';

test('App should render without crashing', () => {
    const component = shallow(<App />);
    expect(component).toBeTruthy();
});

test('RedirectToMenuProduct should redirect to /menu/:product', () => {
    expect(RedirectToMenuProduct()).toEqual(<Redirect to='/menu/pizza' />);
});