import React from 'react';
import { shallow } from 'enzyme';
import { AccountDropdown, Tab } from '../components/AccountDropdown';
import * as TYPE from '../redux/actionTypes';
import { Redirect } from 'react-router-dom';
import toJson from 'enzyme-to-json';

global.window.fetch = jest.fn(() => Promise.resolve({status: 200}));

afterEach(() => {
    jest.restoreAllMocks()
});

describe('AccountDropdown Tests', () => {
    const props = {
        user:{
            admin: true
        },
        dispatch: jest.fn(),
        location:{
            pathname: '/admin/products'
        }
    }

    const component = shallow(<AccountDropdown {...props} />);
    const instance = component.instance();
   
    test('Snapshot Test' ,() => {
        expect(toJson(component)).toMatchSnapshot();
    });
    
    test('signOutUser should called fetch request to signout endpoint', async () => {
        await instance.signOutUser();
        expect(global.window.fetch).toBeCalledTimes(1);
        expect(global.window.fetch).toBeCalledWith('/api/user/signout', { credentials: 'include' });
    });

    test('signOutUser should called dispatch with clear user action', async () => {
        await instance.signOutUser();
        const expectedAction = {
            type: TYPE.CLEAR_USER,
            payload: null,
        }
        expect(props.dispatch).toBeCalledWith(expectedAction);
    });

    test('setRedirect should call setState with correct args if targetLocation and currentLocation are different', () => {
        jest.spyOn(instance, 'setState');
        instance.setRedirect('mock location');
        expect(instance.setState).toBeCalledWith({redirect: 'mock location'});
    });

    test('setRedirect should not call setState if targetLocation and currentLocation are same', () => {
        jest.spyOn(instance, 'setState');
        instance.setRedirect('/admin/products');
        expect(instance.setState).toBeCalledTimes(0);
    });

    test('Should redirect to location if redirect is not null', () => {
        component.setState({redirect: 'mock'});
        expect(instance.render()).toEqual(<Redirect push to='mock' />);
    });

    test('Should find 3 tabs component if user is admin', () => {
        component.setState({redirect: null});
        expect(component.find('Tab').length).toBe(3);
    });

});

describe('Tab tests' ,() => {
    const component = shallow(<Tab onClick={jest.fn()} text='mock' />);
    test('Snapshot Test', () => {
        expect(toJson(component)).toMatchSnapshot();
    });
});