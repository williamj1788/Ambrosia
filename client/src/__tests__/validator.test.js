import { 
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateFirstname,
    validateLastname,
} from '../components/validator';
import toBeType from "jest-tobetype";
expect.extend(toBeType);
global.window.fetch = jest.fn(() => Promise.resolve({status: 200}));
test("validateEmail should return a string if email has no characters", async () => {
    expect(await validateEmail('')).toBeType('string');
});
test("validateEmail should return a string if email is doesn't regex", async () => {
    expect(await validateEmail('mock email')).toBeType('string');
});
test("validateEmail should return null if email is valid", async () => {
    expect(await validateEmail('mockEmail123@gmail.com')).toBeNull();
});

test("validatePassword should return a string if password has no characters", () => {
    expect(validatePassword('')).toBeType('string');
});
test("validatePassword should return a string if password has less than 5 characters", () => {
    expect(validatePassword('mock')).toBeType('string');
});
test("validatePassword should return null if password is valid", () => {
    expect(validatePassword('mocky')).toBeNull();
});

test("validateConfirmPassword should return a string if password and confirmPassword don't match", () => {
    expect(validateConfirmPassword('mock', 'not mock')).toBeType('string');
});
test("validateConfirmPassword should return null if password and confirmPassword match", () => {
    expect(validateConfirmPassword('mock', 'mock')).toBeNull();
});

test('validateFirstname should return a string if firstname has no characters', () => {
    expect(validateFirstname('')).toBeType('string');
});
test('validateFirstname should return null if is vaild', () => {
    expect(validateFirstname('mock')).toBeNull();
});

test('validateLastname should return a string if lastname has no characters', () => {
    expect(validateLastname('')).toBeType('string');
});
test('validateLastname should return null if is valid', () => {
    expect(validateLastname('mock')).toBeNull();
});