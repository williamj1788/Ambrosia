import React from 'react';
import { shallow } from 'enzyme';
import { 
    Navigation,
    NavContainer,
    NavLinkContainer,
    HamburgerDropdown,
    NavLinkWrapper,
 } from '../components/NavComponents';
import toJson from 'enzyme-to-json';
import { Redirect } from 'react-router-dom';


describe('<Navigation /> Snapshop Tests',() => {
    test('renders nav with fixed class when fixed prop is true', () => {
        const component = shallow(<Navigation fixed={true} />);
        expect(toJson(component)).toMatchSnapshot();
    });
    
    test('renders nav with no class when fixed prop is false', () => {
        const component = shallow(<Navigation fixed={false} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('<Navigation /> snapshop Test', () => {
    test('renders div with transparent background when transparent prop is true', () => {
        const component = shallow(<NavContainer transparent={true} />); 
        expect(toJson(component)).toMatchSnapshot(); 
    });

    test('renders div with no transparent background when transparent prop is false', () => {
        const component = shallow(<NavContainer transparent={false} />); 
        expect(toJson(component)).toMatchSnapshot(); 
    });
});

describe('<NavLinkContainer /> snapshop Test', () => {
    test('renders div with correct classes and inline-styles', () => {
        const props = {
            className: 'dummy',
            style: {
                color: 'blue'
            }
        }
        const component = shallow(<NavLinkContainer {...props} />); 
        expect(toJson(component)).toMatchSnapshot(); 
    });
});

describe('<HamburgerDropdown /> snapshop Test', () => {
    test('renders <NavLinkContainer /> with correct style hieght when open prop is true', () => {
        const component = shallow(<HamburgerDropdown open={true} />); 
        expect(toJson(component)).toMatchSnapshot(); 
    });

    test('renders <NavLinkContainer /> with correct style hieght when open prop is false', () => {
        const component = shallow(<HamburgerDropdown open={false} />); 
        expect(toJson(component)).toMatchSnapshot(); 
    });
});

describe('<NavLinkWrapper /> snapshop Test', () => {
    test('renders img if icon prop is present', () => {
        const component = shallow(<NavLinkWrapper icon={'mock icon'} />); 
        expect(component.find('img')).toHaveLength(1); 
    });

    test('renders no img if icon prop is not present', () => {
        const component = shallow(<NavLinkWrapper />); 
        expect(component.find('img')).toHaveLength(0); 
    });

    test('renders span with correct style if TO prop is not present', () => {
        const component = shallow(<NavLinkWrapper />); 
        expect(component.find('span').prop('style')).toHaveProperty('cursor', 'pointer');
    });
});