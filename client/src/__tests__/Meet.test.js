import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Meet, Chief } from "../components/Meet";

describe('<Meet />', () => {
    test('Snapshot Test', () => {
        const component = shallow(<Meet />);
        expect(toJson(component)).toMatchSnapshot();
    });
});


describe('<Chief />', () => {
    test('Snapshot Test', () => {
        const component = shallow(<Chief img={'mock img'} name={'mock name'} desc={'mock desc'} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    test('should render img and p element with correct props', () => {
        const component = shallow(<Chief img={'mock img'} name={'mock name'} desc={'mock desc'} />);
        expect(component.find('img').props().src).toEqual('mock img');
        expect(component.find('img').props().alt).toEqual('mock name');
        expect(component.find('p').props().children).toEqual('mock desc');
    });
});