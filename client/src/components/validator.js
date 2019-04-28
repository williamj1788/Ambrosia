export const validateEmail = email => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.length <= 0){
        return 'Email Required';
    }
    if(!emailRegex.test(email)){
        return 'Invalid Email';
    }
    return null;
}

export const validatePassword = password => {
    if(password.length <= 0){
        return 'Password Required';
    }
    if(password.length < 5){
        return 'Password must be 5 or more characters';
    }
    return null;
}

export const validateConfirmPassword = (password, confirmPassword) => {
    if(password !== confirmPassword){
        return "Does not match password";
    }
    return null;
}

export const validateFirstname = firstname => {
    if(firstname.length <= 0){
        return 'Firstname Required';
    }
    return null;
}

export const validateLastname = lastname => {
    if(lastname.length <= 0){
        return 'Lastname Required';
    }
    return null;
}

export const handleValidationErrors = (validationError, stateErrorProperty) => {
    if(this.state[stateErrorProperty] !== validationError){
        this.setState({
            [stateErrorProperty]: validationError
        });
    }
}

