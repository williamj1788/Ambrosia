import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from '../components/Menu';

test('<Menu /> should render', () => {
    const component = shallow(<Menu  />);
    expect(component).toBeTruthy();
});
