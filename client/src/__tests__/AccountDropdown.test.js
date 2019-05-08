import React from 'react';
import { shallow } from 'enzyme';
import { AccountDropdown, Tab } from '../components/AccountDropdown';
import * as TYPE from '../redux/actionTypes';

global.window.fetch = jest.fn(() => Promise.resolve({status: 200}));

afterEach(() => {
    jest.restoreAllMocks()
});

describe('AccountDropdown Tests', () => {
    const props = {
        user:{},
        dispatch: jest.fn()
    }

    const component = shallow(<AccountDropdown {...props} />);
    const instance = component.instance();
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
});