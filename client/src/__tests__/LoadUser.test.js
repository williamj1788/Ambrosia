import React from 'react';
import { shallow } from 'enzyme';
import { LoadUser } from '../components/LoadUser';
import { SET_USER } from '../redux/actionTypes';


jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: jest.fn(() => {return {user: 'mock user'}})
}));

const props = {
    user:{
        picture: 'mock picture',
        firstname: 'mock Firstname'
    },
    dispatch: jest.fn()
}
let component = shallow(<LoadUser {...props} ><div>children</div></LoadUser>);
let instance = component.instance();

test('should render loading screen if user hasnt loaded yet', () => {
    expect(instance.render()).toEqual(<div>Loading...</div>);
});

test('should render childern if user is loaded', () => {
    component.setState({loading: false});
    expect(instance.render()).toEqual(<div><div>children</div></div>);
});

test('loadUser should call dispatch with correct args', async () => {
    await instance.loadUser();
    expect(props.dispatch).toBeCalledWith({ type: SET_USER, payload: {user: 'mock user'}});
})

test('fetchUser should fetch to a get user data endpoint', () => {
    instance.fetchUser();
    expect(global.fetch).toBeCalledWith('/api/user', {credentials: 'include' })
});

test('fetchUser should return a user', async () => {
    expect(await instance.fetchUser()).toEqual({user: 'mock user'});
});

test('setLoading should set loading to value', () => {
    jest.spyOn(instance, 'setState');
    instance.setLoading(false);
    expect(instance.setState).toBeCalledWith({loading: false});
});