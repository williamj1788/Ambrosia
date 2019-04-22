import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { HoursSection, LinkIcon, ContactSection } from '../components/Footer';

test('<HoursSection /> should render correct date and time', () => {
    const component = mount(<HoursSection date={'mock date'} time={'mock time'} />);
    expect(toJson(component)).toMatchSnapshot();
});

test('<LinkIcon /> should render an achor with correct class and href', () => {
    const component = mount(<LinkIcon href={'mock href'} className={'mock classname'} />);
    expect(toJson(component)).toMatchSnapshot();
});

test('<ContactSection /> should render correct image and text ', () => {
    const component = mount(<ContactSection img={'mock img'} text={'mock text'} />);
    expect(toJson(component)).toMatchSnapshot();
});