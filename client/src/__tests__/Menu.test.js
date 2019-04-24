import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
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
    component = shallow(<Menu {...props} />,{
        disableLifecycleMethods: true,
    });
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

test('componentDidUpdate should called setState with correct args if redirect state is true' , () => {
    jest.spyOn(instance, 'setState');
    component.setState({redirect: true});
    instance.componentDidUpdate();
    const expectArgs = {
        redirect: false,
        productTarget: null,
    }
    expect(instance.setState).toBeCalledWith(expectArgs);
});

test('should redirect to product if redirect state is true', () => {
    component.setState({redirect: true, productTarget: 'mockTarget'});
    expect(instance.render()).toEqual(<Redirect to={'/menu/mockTarget'} />);
});