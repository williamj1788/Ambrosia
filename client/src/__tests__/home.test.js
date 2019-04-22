import React from 'react';
import { shallow } from 'enzyme';
import { Home ,Unit } from '../components/home';
import toJson from 'enzyme-to-json';
import { SET_PAGE } from '../redux/actionTypes';

test('<Home /> should call dispatch with correct action on mount', () => {
    const props = {
        dispatch: jest.fn(),
        match: {
            path: '/'
        }
    }
    
    const component = shallow(<Home {...props} />);
    const instance = component.instance();

    instance.componentWillMount();

    const expectedAction = {
        type: SET_PAGE,
        payload: '/'
    }

    expect(props.dispatch).toBeCalledWith(expectedAction);
});

test('should render an img, span with title, and desc', () => {
    const component = shallow(<Unit img={'mock img'} title={'mock title'} desc={'mock desc'} />);
    expect(toJson(component)).toMatchSnapshot();
});