import React from 'react';
import { shallow } from 'enzyme';
import { Unit } from '../components/home';
import toJson from 'enzyme-to-json';

test('<Unit /> should render', () => {
    const component = shallow(<Unit />);
    expect(component).toBeTruthy();
});

test('should render an img, span with title, and desc', () => {
    const component = shallow(<Unit img={'mock img'} title={'mock title'} desc={'mock desc'} />);
    expect(toJson(component)).toMatchSnapshot();
});