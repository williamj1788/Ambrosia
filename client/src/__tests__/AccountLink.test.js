import React from 'react';
import { AccountLink } from '../components/AccountLink';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';



const props = {
    user:{
        picture: 'mock picture',
        firstname: 'mock Firstname'
    }
}
let component = shallow(<AccountLink {...props} />);
const instance = component.instance();

afterEach(() => {
    jest.restoreAllMocks();
});

test('Snapshot test', () => {
    expect(toJson(component)).toMatchSnapshot();
});

test('handleScroll should set showDropdown to false if true' , () => {
    component.setState({showDropdown: true});
    jest.spyOn(instance, 'setState');
    instance.handleScroll();
    expect(instance.setState).toBeCalledTimes(1);
    expect(instance.setState).toBeCalledWith({showDropdown: false});
});

test('handleScroll should not called setState if showDropdown is false', () => {
    component.setState({showDropdown: false});
    jest.spyOn(instance, 'setState');
    instance.handleScroll();
    expect(instance.setState).toBeCalledTimes(0);
});

test('toggleDropdown should toggle showDropdown', () => {
    component.setState({showDropdown: false});
    jest.spyOn(instance, 'setState');
    instance.toggleDropdown();
    expect(instance.setState).toBeCalledTimes(1);
    expect(instance.setState).toBeCalledWith({showDropdown: true});
});

test('should render NavLinkWrapper if no user is found', () => {
    component = shallow(<AccountLink />);
    expect(component.find('NavLinkWrapper').length).toBe(1);
});