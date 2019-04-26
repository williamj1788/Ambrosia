import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { HoursSection, LinkIcon, ContactSection, Footer, Opening, Contact } from '../components/Footer';

describe('<Footer />', () => {
    test('Snapshot Test', () => {
        const component = shallow(<Footer />);
        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('<Opening />', () => {
    test('Snapshot Test', () => {
        const component = shallow(<Opening />);
        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('<HoursSection />', () => {
    test('Snapshot Test', () => {
        const component = shallow(<HoursSection />);
        expect(toJson(component)).toMatchSnapshot();
    });

    test('<HoursSection /> should render two p element with correct date and time', () => {
        const component = shallow(<HoursSection date={'mock date'} time={'mock time'} />);
        expect(component.find('p').findWhere(n => n.props().children === 'mock date')).toHaveLength(1);
        expect(component.find('p').findWhere(n => n.props().children === 'mock time')).toHaveLength(1);
    });
});

describe('<Contact />', () => {
    test('Snapshot Test', () => {
        const component = shallow(<Contact />);
        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('<LinkIcon />', () => {
    test('Snapshot Test', () => {
        const component = shallow(<LinkIcon href={'mock href'} className={'mockClassname'} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    test('<LinkIcon /> should render an achor with correct class and href', () => {
        const component = shallow(<LinkIcon href={'mock href'} className={'mockClassname'} />);
        expect(component.find('a').props().href).toEqual('mock href');
        expect(component.find('a').hasClass('mockClassname')).toBeTruthy();
    });
});

describe('<ContactSection />', () => {
    test('Snapshot Test', () => {
        const component = shallow(<ContactSection img={'mock img'} text={'mock text'} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    test('<ContactSection /> should render correct image and text ', () => {
        const component = shallow(<ContactSection img={'mock img'} text={'mock text'} />);
        expect(component.find('img').props().src).toEqual('mock img');
        expect(component.find('p').props().children).toEqual('mock text');
    });
});
