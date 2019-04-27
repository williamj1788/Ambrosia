import React from 'react';
import { shallow } from 'enzyme';
import { SignUpForm } from '../components/SignUpForm';
import toBeType from "jest-tobetype";
import toJson from 'enzyme-to-json';

expect.extend(toBeType);

describe('<SignUpForm />', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    const component = shallow(<SignUpForm />);
    const instance = component.instance();
    
    test('Snapshot test', () => {
        expect(toJson(component)).toMatchSnapshot();
    });

    test("validateEmail should return a string if email has no characters", () => {
        expect(instance.validateEmail('')).toBeType('string');
    });
    test("validateEmail should return a string if email is doesn't regex", () => {
        expect(instance.validateEmail('mock email')).toBeType('string');
    });
    test("validateEmail should return null if email is valid", () => {
        expect(instance.validateEmail('mockEmail123@gmail.com')).toBeType('null');
    });

    test("validatePassword should return a string if password has no characters", () => {
        expect(instance.validatePassword('')).toBeType('string');
    });
    test("validatePassword should return a string if password has less than 5 characters", () => {
        expect(instance.validatePassword('mock')).toBeType('string');
    });
    test("validatePassword should return null if password is valid", () => {
        expect(instance.validatePassword('mocky')).toBeType('null');
    });

    test("validateConfirmPassword should return a string if password and confirmPassword don't match", () => {
        expect(instance.validateConfirmPassword('mock', 'not mock')).toBeType('string');
    });
    test("validateConfirmPassword should return null if password and confirmPassword match", () => {
        expect(instance.validateConfirmPassword('mock', 'mock')).toBeType('null');
    });

    test('validateFirstname should return a string if firstname has no characters', () => {
        expect(instance.validateFirstname('')).toBeType('string');
    });
    test('validateFirstname should return null if is vaild', () => {
        expect(instance.validateFirstname('mock')).toBeType('null');
    });

    test('validateLastname should return a string if lastname has no characters', () => {
        expect(instance.validateLastname('')).toBeType('string');
    });
    test('validateLastname should return null if is valid', () => {
        expect(instance.validateLastname('mock')).toBeType('null');
    });
});