import React from 'react';
import { shallow } from 'enzyme';
import { SignUp, Perk, AccountPerks } from '../components/SignUp';
import toJson from 'enzyme-to-json';


describe('<SignUp />', () => {
    test('Snapshot test', () => {
        const component = shallow(<SignUp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('<AccountPerks />', () => {
    test('Snapshot test', () => {
        const component = shallow(<AccountPerks />);
        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('<Perk />', () => {
    test('Snapshot test', () => {
        const component = shallow(<Perk img={'mock img'} text={'mock text'} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    test('should render correct elements', () => {
        const component = shallow(<Perk img={'mock img'} text={'mock text'} />);
        expect(component.find('img').props().src).toBe('mock img');
        expect(component.find('p').props().children).toBe('mock text');
    });
});