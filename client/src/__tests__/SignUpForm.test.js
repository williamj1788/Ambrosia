import React from 'react';
import { shallow } from 'enzyme';
import { SignUpForm, View, Controllers, ControllerButtons, Form, FormBlock,Input } from '../components/SignUpForm';
import toBeType from "jest-tobetype";
import toJson from 'enzyme-to-json';

expect.extend(toBeType);

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
        jest.spyOn(instance,'validateEmail').mockImplementation(() => 'anything');
        instance.handleEmailBlur(event);
        expect(instance.handleValidationErrors).toHaveBeenCalledWith('anything','emailError');
    });
    test('handleEmailBlur should return a boolean', () => {
        expect(instance.handleEmailBlur(event)).toBeType('boolean');
    });

    test('handlePasswordBlur should call handleValidationErrors with correct args', () => {
        jest.spyOn(instance,'handleValidationErrors');
        jest.spyOn(instance,'validatePassword').mockImplementation(() => 'anything');
        instance.handlePasswordBlur(event);
        expect(instance.handleValidationErrors).toHaveBeenCalledWith('anything','passwordError');
    });
    test('handlePasswordBlur should return a boolean', () => {
        expect(instance.handlePasswordBlur(event)).toBeType('boolean');
    });

    test('handleConfirmPasswordBlur should call handleValidationErrors with correct args', () => {
        jest.spyOn(instance,'handleValidationErrors');
        jest.spyOn(instance,'getInputValuebyName').mockImplementation(() => 'anything');
        jest.spyOn(instance,'validateConfirmPassword').mockImplementation(() => 'anything');
        instance.handleConfirmPasswordBlur(event);
        expect(instance.handleValidationErrors).toHaveBeenCalledWith('anything','confirmPasswordError');
    });
    test('handleConfirmPasswordBlur should return a boolean', () => {
        jest.spyOn(instance,'getInputValuebyName').mockImplementation(() => 'anything');
        expect(instance.handleConfirmPasswordBlur(event)).toBeType('boolean');
    });

    test('handleFirstnameBlur should call handleValidationErrors with correct args', () => {
        jest.spyOn(instance,'handleValidationErrors');
        jest.spyOn(instance,'validateFirstname').mockImplementation(() => 'anything');
        instance.handleFirstnameBlur(event);
        expect(instance.handleValidationErrors).toHaveBeenCalledWith('anything','firstnameError');
    });
    test('handleFirstnameBlur should return a boolean', () => {
        expect(instance.handleFirstnameBlur(event)).toBeType('boolean');
    });

    test('handleLastnameBlur should call handleValidationErrors with correct args', () => {
        jest.spyOn(instance,'handleValidationErrors');
        jest.spyOn(instance,'validateLastname').mockImplementation(() => 'anything');
        instance.handleLastnameBlur(event);
        expect(instance.handleValidationErrors).toHaveBeenCalledWith('anything','lastwordError');
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

    test("validateEmail should return a string if email has no characters", () => {
        expect(instance.validateEmail('')).toBeType('string');
    });
    test("validateEmail should return a string if email is doesn't regex", () => {
        expect(instance.validateEmail('mock email')).toBeType('string');
    });
    test("validateEmail should return null if email is valid", () => {
        expect(instance.validateEmail('mockEmail123@gmail.com')).toBeNull();
    });

    test("validatePassword should return a string if password has no characters", () => {
        expect(instance.validatePassword('')).toBeType('string');
    });
    test("validatePassword should return a string if password has less than 5 characters", () => {
        expect(instance.validatePassword('mock')).toBeType('string');
    });
    test("validatePassword should return null if password is valid", () => {
        expect(instance.validatePassword('mocky')).toBeNull();
    });

    test("validateConfirmPassword should return a string if password and confirmPassword don't match", () => {
        expect(instance.validateConfirmPassword('mock', 'not mock')).toBeType('string');
    });
    test("validateConfirmPassword should return null if password and confirmPassword match", () => {
        expect(instance.validateConfirmPassword('mock', 'mock')).toBeNull();
    });

    test('validateFirstname should return a string if firstname has no characters', () => {
        expect(instance.validateFirstname('')).toBeType('string');
    });
    test('validateFirstname should return null if is vaild', () => {
        expect(instance.validateFirstname('mock')).toBeNull();
    });

    test('validateLastname should return a string if lastname has no characters', () => {
        expect(instance.validateLastname('')).toBeType('string');
    });
    test('validateLastname should return null if is valid', () => {
        expect(instance.validateLastname('mock')).toBeNull();
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