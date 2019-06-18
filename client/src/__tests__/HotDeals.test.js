import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { HotDeals, DealContainer, Deal } from "../components/home/HotDeals";

describe('<HotDeals />', () => {
    test('Snapshot Test', () => {
        const component = shallow(<HotDeals />);
        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('<DealContainer />', () => {
    test('Snapshot Test', () => {
        const component = shallow(<DealContainer />);
        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('<Deal />', () => {
    test('Snapshot Test', () => {
        const component = shallow(<Deal />);
        expect(toJson(component)).toMatchSnapshot();
    });
});