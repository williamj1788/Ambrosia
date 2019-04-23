import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from '../components/Menu';

test('<Menu /> should render', () => {
    const props = {
        match: {
            params: {
                product: 'pizza'
            }
        }
    }
    
    const component = shallow(<Menu {...props} />);
    expect(component).toBeTruthy();
});
