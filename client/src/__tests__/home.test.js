import React from 'react';
import { shallow } from 'enzyme';
import { Unit, Home } from '../components/home';
import { Redirect } from 'react-router-dom';
import toJson from 'enzyme-to-json';

describe('Home Tests', () => {
    test('setRedirect should call setState with correct args', () => {
        const component = shallow(<Home />);
        const instance = component.instance();
        jest.spyOn(instance, 'setState');
        instance.setRedirect();

        const expectedArgs = {
            redirectToMenu: true,
        }

        expect(instance.setState).toBeCalledTimes(1);
        expect(instance.setState).toBeCalledWith(expectedArgs);
    });

    test('should redirect to menu when redirectToMenu state is true', () => {
        const component = shallow(<Home />);
        const instance = component.instance();
        component.setState({redirectToMenu: true});
        expect(instance.render()).toEqual(<Redirect push to='/menu' />);
    });
});

describe('Unit component Tests', () => {
    test('<Unit /> should render', () => {
        const component = shallow(<Unit />);
        expect(component).toBeTruthy();
    });
    
    test('should render an img, span with title, and desc', () => {
        const component = shallow(<Unit img={'mock img'} title={'mock title'} desc={'mock desc'} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});