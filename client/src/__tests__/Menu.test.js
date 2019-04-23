import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from '../components/Menu';

let props,
    component,
    instance;
beforeEach(() => {
    props = {
        match: {
            params: {
                product: 'pizza'
            }
        }
    }
    component = shallow(<Menu {...props} />);
    instance = component.instance();
});

test('should render', () => {
    expect(component).toBeTruthy();
});

test('redirectToProduct should called setState with correct args' , () => {
    jest.spyOn(instance, 'setState');
    instance.redirectToProduct('mock product');
    const expectArgs = {
        redirect: true,
        productTarget: 'mock product',
    }
    expect(instance.setState).toBeCalledWith(expectArgs);
});

test('componentDidUpdate should called setState with correct args if state redirect is true' , () => {
    jest.spyOn(instance, 'setState');
    const expectArgs = {
        redirect: false,
        productTarget: null,
    }
    component.setState({redirect: true});

    expect(instance.setState).toBeCalledWith(expectArgs);
    expect(instance.setState).toBeCalledTimes(1);
});