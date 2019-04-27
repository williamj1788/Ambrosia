import React from 'react';
import s from '../styles/SignUpForm.module.scss';

class SignUpForm extends React.Component{
    
    state = {
        activeFormBlock: 0,
        formBlockProgress: 0,
        emailError: null,
        passwordError: null,
        confirmPasswordError: null,
        firstnameError: null,
        lastwordError: null,
    }

    handleOnClick = target => {
        const { activeFormBlock, formBlockProgress } = this.state;
        if(target === activeFormBlock){ // don't unnecessarily set the state
            return
        }
        if(target > formBlockProgress + 1){ // User can only Progress one block at a time 
            return
        }
        if(target > formBlockProgress){
            if(formBlockProgress === 0 && this.validateFirstFormBlock()){
                this.setState({
                    activeFormBlock: target,
                    formBlockProgress: target
                });
            }
        }else if(target <= formBlockProgress){
            this.setState({
                activeFormBlock: target,
            });
        }
    }

    handleSubmit = () => {
        const isFirstBlockValid = this.validateFirstFormBlock();
        if(!isFirstBlockValid){
            this.setState({
                activeFormBlock: 0 
            });
        }
        console.log('TODO');
    }

    validateFirstFormBlock = () => {
        const isEmailValid = this.handleEmailBlur();
        const isPasswordValid = this.handlePasswordBlur();
        const isConfirmPassword = this.handleConfirmPasswordBlur();
        
        return isEmailValid && isPasswordValid && isConfirmPassword;
    }

    handleEmailBlur = () => {
        const { emailError } = this.state;
        const email = this.getInputValuebyName('Email');
        const validationError = this.validateEmail(email);
        
        if(emailError !== validationError){
            this.setState({
                emailError: validationError
            });
        }

        return !validationError;
    }

    handlePasswordBlur = () => {
        const { passwordError } = this.state;
        const password = this.getInputValuebyName('Password');
        const validationError = this.validatePassword(password);

        if(passwordError !== validationError){
            this.setState({
                passwordError: validationError
            });
        }
        return !validationError;
    }

    handleConfirmPasswordBlur = () => {
        const { confirmPasswordError } = this.state;
        const password = this.getInputValuebyName('Password');
        const confirmPassword = this.getInputValuebyName('ConfirmPassword');
        const validationError = this.validateConfirmPassword(password, confirmPassword);
        
        if(confirmPasswordError !== validationError){
            this.setState({
                confirmPasswordError: validationError
            });
        }
        return !validationError;

    }

    handleFirstnameBlur = () => {
        const { firstnameError } = this.state
        const firstname = this.getInputValuebyName('Firstname');
        const validationError = this.validateFirstname(firstname);

        if(firstnameError !== validationError){
            this.setState({
                firstnameError: validationError
            });
        }
        return !validationError;
    }

    handleLastnameBlur = () => {
        const { lastwordError } = this.state
        const lastname = this.getInputValuebyName('Lastname');
        const validationError = this.validateLastname(lastname);

        if(lastwordError !== validationError){
            this.setState({
                lastwordError: validationError
            });
        }
        return !validationError;
    }

    validateEmail = email => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.length <= 0){
            return 'Email Required';
        }
        if(!emailRegex.test(email)){
            return 'Invalid Email';
        }
        return null;
    }

    validatePassword = password => {
        if(password.length <= 0){
            return 'Password Required';
        }
        if(password.length < 5){
            return 'Password must be 5 or more characters';
        }
        return null;
    }

    validateConfirmPassword = (password, confirmPassword) => {
        if(password !== confirmPassword){
            return "Does not match password";
        }
        return null;
    }

    validateFirstname = firstname => {
        if(firstname.length <= 0){
            return 'Firstname Required';
        }
        return null;
    }

    validateLastname = lastname => {
        if(lastname.length <= 0){
            return 'Lastname Required';
        }
        return null;
    }

    getInputValuebyName = name => {
        return document.querySelector(`input[name = ${name}]`).value;
    }
    
    render(){
        const { 
            activeFormBlock,
            formBlockProgress ,
            emailError,
            passwordError,
            confirmPasswordError,
            firstnameError,
            lastwordError,
        } = this.state;
        return(
            <div className={s.SignUp}>
                <Header />
                <View>
                    <Form id='signUP-form' active={activeFormBlock} >
                        <FormBlock>
                            <Input type='text' placeholder='Email *' name='Email' onBlur={this.handleEmailBlur} error={emailError} />
                            <Input type='password' placeholder='Password *' name='Password' onBlur={this.handlePasswordBlur} error={passwordError} />
                            <Input type='password' placeholder='Confirm Password *' name='ConfirmPassword' label="Confirm Password" onBlur={this.handleConfirmPasswordBlur} error={confirmPasswordError} />
                        </FormBlock>
                        <FormBlock>
                            <Input  type='text' placeholder='First Name *' name='Firstname' onBlur={this.handleFirstnameBlur} error={firstnameError} />
                            <Input  type='text' placeholder='Last Name *' name='Lastname' onBlur={this.handleLastnameBlur} error={lastwordError} />
                            <Input  type='text' placeholder='Address' name='Address' />
                        </FormBlock>
                    </Form>
                </View>
                <Controllers active={activeFormBlock} progress={formBlockProgress} onClick={this.handleOnClick} />
                <ControllerButtons active={activeFormBlock} onClick={this.handleOnClick} submit={this.handleSubmit} />
            </div>
        )
    }
}

const Header = () => {
    return(
        <div className={s.header}>
            <span className={s.headerText}>Sign Up</span>
        </div>
    )
}

const View = ({ children }) => {
    return(
        <div className={s.view}>
            {children}
        </div>
    )
}

const Controllers = ({ active, progress, onClick }) => {
    
    let buttons = [];
    for(let i = 0; i < 2; i++){
        let state;
        if(i === active){
            state = 'active'
        }else if(i <= progress){
            state = 'visted'
        }else{
            state = 'default'
        }
        buttons.push(<button key={i} onClick={state === 'visted' ? () => onClick(i) : undefined} className={`${s.controller} ${s[state]}`} ></button>);
    }

    return(
        <div className={s.controllerContainer}>
            {buttons}
        </div>
    )
}

const ControllerButtons = ({ active, onClick, submit }) => {
    return(
        <div className={s.buttonContainer}>
            {active !== 0 && <button className={s.button} onClick={() => onClick(active - 1)}>Back</button> }
            {active < 1 && <button className={s.button} onClick={() => onClick(active + 1)}>Next</button>}
            {active === 1 && <button className={s.button} onClick={submit}>Sign Up</button>} 
        </div>
    )
}

const Form = ({ id, active, children }) => {
    const FormWidth = 540; // from SignUpForm.module.scss
    const style = {
        right: FormWidth * active
    };

    
    return(
        <form className={s.form} id={id} style={style}>
            {children}
        </form>
    )
}

const FormBlock = ({ children }) => {
    return(
        <div className={s.formBlock}>
            {children}
        </div>
    )
}

const Input = ({ type, placeholder, label , onBlur, name, error }) => {
    let props = { 
        className: s.input,
        type,
        placeholder,
        name,
        onBlur,
    };
    if(error){
        props.style = {
            border: '2px solid red'
        }
    }
    return(
        <div className={s.inputContainer}>
            <label style={{fontWeight: '500'}} htmlFor={name}>{label || name}</label>
            <input {...props} />
            {error && <p className={s.error}>{error}</p>}
        </div>
    )
}

export default SignUpForm;