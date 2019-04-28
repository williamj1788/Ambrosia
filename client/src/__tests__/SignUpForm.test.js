import React from 'react';
import { shallow } from 'enzyme';
import { 
    SignUpForm, 
    View, 
    Controllers, 
    ControllerButtons, 
    Form, 
    FormBlock, 
    Input 
} from '../components/SignUpForm';

import toBeType from "jest-tobetype";
import toJson from 'enzyme-to-json';

expect.extend(toBeType);
jest.mock('../components/validator'); // where ever validator.js is located

describe('<SignUpForm />', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    const component = shallow(<SignUpForm />);
    const instance = component.instance();
    const event = {
        target:{
            value: 'mock'
        }
    }
    
    test('Snapshot test', () => {
        expect(toJson(component)).toMatchSnapshot();
    });

    test('handleSubmit should set activeFormBlock to zero if firstBlock isnt validated', () => {
        jest.spyOn(instance,'validateFirstFormBlock').mockImplementation(() => false);
        jest.spyOn(instance,'setState')
        instance.handleSubmit();
        expect(instance.setState).toBeCalledWith({activeFormBlock: 0});
    });

    test('handleSubmit should set activeFormBlock to 1 if secondBlock isnt validated', () => {
        jest.spyOn(instance,'validateFirstFormBlock').mockImplementation(() => true);
        jest.spyOn(instance,'validateSecondFormBlock').mockImplementation(() => false);
        jest.spyOn(instance,'setState')
        instance.handleSubmit();
        expect(instance.setState).toBeCalledWith({activeFormBlock: 1});
    });

    test('validateFirstFormBlock should called correct validation functions', () => {
        jest.spyOn(instance,'handleEmailBlur').mockImplementation(() => 'anything');
        jest.spyOn(instance,'handlePasswordBlur').mockImplementation(() => 'anything');
        jest.spyOn(instance,'handleConfirmPasswordBlur').mockImplementation(() => 'anything');
        instance.validateFirstFormBlock();
        expect(instance.handleEmailBlur).toBeCalled();
        expect(instance.handlePasswordBlur).toBeCalled();
        expect(instance.handleConfirmPasswordBlur).toBeCalled();
    });
    test('validateFirstFormBlock should return a boolean', () => {
        jest.spyOn(instance,'handleEmailBlur').mockImplementation(() => true);
        jest.spyOn(instance,'handlePasswordBlur').mockImplementation(() => true);
        jest.spyOn(instance,'handleConfirmPasswordBlur').mockImplementation(() => true);
        instance.validateFirstFormBlock();
        expect(instance.validateFirstFormBlock()).toBeType('boolean');
    });

    test('validateSecondFormBlock should called correct validation functions', () => {
        jest.spyOn(instance,'handleFirstnameBlur').mockImplementation(() => 'anything');
        jest.spyOn(instance,'handleLastnameBlur').mockImplementation(() => 'anything');
        instance.validateSecondFormBlock();
        expect(instance.handleFirstnameBlur).toBeCalled();
        expect(instance.handleLastnameBlur).toBeCalled();
    });
    test('validateSecondFormBlock should return a boolean', () => {
        jest.spyOn(instance,'handleFirstnameBlur').mockImplementation(() => true);
        jest.spyOn(instance,'handleLastnameBlur').mockImplementation(() => true);
        instance.validateSecondFormBlock();
        expect(instance.validateSecondFormBlock()).toBeType('boolean');
    });

    test('handleEmailBlur should call handleValidationErrors with correct args', () => {
        jest.spyOn(instance,'handleValidationErrors');
        instance.handleEmailBlur(event);
        expect(instance.handleValidationErrors).toHaveBeenCalledWith(undefined,'emailError');
    });
    test('handleEmailBlur should return a boolean', () => {
        expect(instance.handleEmailBlur(event)).toBeType('boolean');
    });

    test('handlePasswordBlur should call handleValidationErrors with correct args', () => {
        jest.spyOn(instance,'handleValidationErrors');
        instance.handlePasswordBlur(event);
        expect(instance.handleValidationErrors).toHaveBeenCalledWith(undefined,'passwordError');
    });
    test('handlePasswordBlur should return a boolean', () => {
        expect(instance.handlePasswordBlur(event)).toBeType('boolean');
    });

    test('handleConfirmPasswordBlur should call handleValidationErrors with correct args', () => {
        jest.spyOn(instance,'handleValidationErrors');
        jest.spyOn(instance,'getInputValuebyName').mockImplementation(() => 'anything');
        instance.handleConfirmPasswordBlur(event);
        expect(instance.handleValidationErrors).toHaveBeenCalledWith(undefined,'confirmPasswordError');
    });
    test('handleConfirmPasswordBlur should return a boolean', () => {
        jest.spyOn(instance,'getInputValuebyName').mockImplementation(() => 'anything');
        expect(instance.handleConfirmPasswordBlur(event)).toBeType('boolean');
    });

    test('handleFirstnameBlur should call handleValidationErrors with correct args', () => {
        jest.spyOn(instance,'handleValidationErrors');
        instance.handleFirstnameBlur(event);
        expect(instance.handleValidationErrors).toHaveBeenCalledWith(undefined,'firstnameError');
    });
    test('handleFirstnameBlur should return a boolean', () => {
        expect(instance.handleFirstnameBlur(event)).toBeType('boolean');
    });

    test('handleLastnameBlur should call handleValidationErrors with correct args', () => {
        jest.spyOn(instance,'handleValidationErrors');
        instance.handleLastnameBlur(event);
        expect(instance.handleValidationErrors).toHaveBeenCalledWith(undefined,'lastwordError');
    });
    test('handleLastnameBlur should return a boolean', () => {
        expect(instance.handleLastnameBlur(event)).toBeType('boolean');
    });
    
    test('handleValidationErrors should set the errorState to validationError if they differ', () => {
        component.setState({mockState: null});
        jest.spyOn(instance,'setState');
        instance.handleValidationErrors('mock error', 'mockState');
        expect(instance.setState).toBeCalledWith({'mockState': 'mock error'});
    });

});

describe('<View />', () => {
    const component = shallow(<View><div>mock</div></View>);
    test('Snapshot test', () => {
        expect(toJson(component)).toMatchSnapshot();
    });
})

describe('<Controllers />', () => {
    const component = shallow(<Controllers active={0} progress={1} onClick={jest.fn()} />);
    test('Snapshot test', () => {
        expect(toJson(component)).toMatchSnapshot();
    });
})

describe('<ControllerButtons />', () => {
    const component = shallow(<ControllerButtons active={0} submit={jest.fn()} onClick={jest.fn()} />);
    test('Snapshot test', () => {
        expect(toJson(component)).toMatchSnapshot();
    });
})

describe('<Form />', () => {
    const component = shallow(<Form active={1} id={'mockId'}><div>mock children</div></Form>);
    test('Snapshot test', () => {
        expect(toJson(component)).toMatchSnapshot();
    });
})

describe('<FormBlock />', () => {
    const component = shallow(<FormBlock><div>mock</div></FormBlock>);
    test('Snapshot test', () => {
        expect(toJson(component)).toMatchSnapshot();
    });
})

describe('<Input />', () => {
    const component = shallow(<Input type='text' placeholder="mock placeholder" label='mock label' onBlur={jest.fn()} name={'mockName'} error={'mock error'} />);
    test('Snapshot test', () => {
        expect(toJson(component)).toMatchSnapshot();
    });
})