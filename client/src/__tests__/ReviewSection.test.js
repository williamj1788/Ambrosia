import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { ReviewSection, calulateRelativeOffset, Selection } from '../components/ReviewSection';

afterEach(() => {
    jest.restoreAllMocks()
});

describe('ReviewSection component test' , () => {
    const component = shallow(<ReviewSection />);
    const instance = component.instance();

    test('incrementSelected should be called every 4s when <ReviewSection /> mounts', () => {
        jest.useFakeTimers();
        jest.spyOn(instance, 'incrementSelected');
        instance.componentWillMount();
        expect(setInterval).toHaveBeenCalledWith(instance.incrementSelected, 4000);
    });
    
    test('setInterval should be called once when <ReviewSection /> mounts', () => {
        jest.useFakeTimers();
        jest.spyOn(instance, 'incrementSelected');
        instance.componentWillMount();
        expect(setInterval).toHaveBeenCalledTimes(1);
    });
    
    test('incrementSelected should increment selected state if below numOfReviews - 1', () => {
        component.setState({selected: 0, numOfReviews: 5});
        jest.spyOn(instance, 'setSelected');
        const selected = component.state().selected;
        instance.incrementSelected();
        expect(instance.setSelected).toBeCalledWith(selected + 1);
    });
    
    test('incrementSelected should set selected state to 0 if selected is equal to numOfReviews - 1', () => {
        component.setState({selected: 4, numOfReviews: 5});
        jest.spyOn(instance, 'setSelected');
        instance.incrementSelected();
        expect(instance.setSelected).toBeCalledWith(0);
    });
    
    test('setSelected should set correct stated when called', () => {
        instance.setSelected(6);
        expect(component.state().selected).toBe(6);
    });
});

describe('calulateRelativeOffset test', () => {
    test('should return correct output', () => {
        global.window.innerWidth = 1200;
        expect(calulateRelativeOffset(1)).toBe(1400);
    });
});

describe('Selection component test', () => {
    test('should render correct buttons', () => {
        const component = shallow(<Selection selected={0} numOfReviews={5} setSelected={jest.fn()} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
