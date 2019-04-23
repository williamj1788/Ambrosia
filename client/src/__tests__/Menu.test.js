import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from '../components/Menu';
import { SET_PAGE } from '../redux/actionTypes';

test('<Menu /> should call dispatch with correct action on mount', () => {
    const props = {
        dispatch: jest.fn(),
        match: {
            path: '/menu'
        }
    }
    
    const component = shallow(<Menu {...props} />);
    const instance = component.instance();

    instance.componentWillMount();

    const expectedAction = {
        type: SET_PAGE,
        payload: '/menu'
    }

    expect(props.dispatch).toBeCalledWith(expectedAction);
});
