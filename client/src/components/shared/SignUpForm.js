import React from 'react';
import s from '../../styles/SignUpForm.module.scss';

import { NavLink, Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { 
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateFirstname,
    validateLastname,
 } from '../../validator';

import { connect } from 'react-redux';
import { setUser } from '../../redux/action';

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export class SignUpForm extends React.Component{
    
    state = {
        activeFormBlock: 0,
        formBlockProgress: 0,
        redirect: false,
        emailError: null,
        passwordError: null,
        confirmPasswordError: null,
        firstnameError: null,
        lastwordError: null,
    }

    handleOnClick = async target => {
        const { activeFormBlock, formBlockProgress } = this.state;
        if(target === activeFormBlock){ // don't unnecessarily set the state
            return
        }
        if(target > formBlockProgress + 1){ // User can only Progress one block at a time 
            return
        }
        if(target > formBlockProgress){
            if(formBlockProgress === 0 && await this.validateFirstFormBlock()){
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

    handleSubmit = async () => {
        const isFirstBlockValid = await this.validateFirstFormBlock();
        if(!isFirstBlockValid){
            this.setState({
                activeFormBlock: 0 
            });
            return
        }
        const isSecondBlockValid = this.validateSecondFormBlock();
        if(!isSecondBlockValid){
            this.setState({
                activeFormBlock: 1 
            });
            return
        }
        await fetch('/api/user/create', {
            credentials: 'include',
            method: 'POST',
            body: this.getFormData(),
        })
        .then(res => res.json())
        .then(res => {
            this.props.dispatch(setUser(res));
        })

        this.setState({
            redirect: true,
        });

        
    }

    validateFirstFormBlock = async () => {
        const isEmailValid = await this.handleEmailBlur();
        const isPasswordValid = this.handlePasswordBlur();
        const isConfirmPassword = this.handleConfirmPasswordBlur();
        
        return isEmailValid && isPasswordValid && isConfirmPassword;
    }

    validateSecondFormBlock = () => {
        const isFirstnameValid = this.handleFirstnameBlur();
        const isLastnameValid = this.handleLastnameBlur();
        
        return isFirstnameValid && isLastnameValid;
    }

    handleEmailBlur = async event => {
        let email;
        if(event){
            email = event.target.value;
        }else{
            email = this.getInputValuebyName('Email');
        }
        const validationError = await validateEmail(email, true);
        
        this.handleValidationErrors(validationError, 'emailError');

        return !validationError;
    }

    handlePasswordBlur = event => {
        let password;
        if(event){
            password = event.target.value;
        }else{
            password = this.getInputValuebyName('Password');
        }
        const validationError = validatePassword(password);

        this.handleValidationErrors(validationError, 'passwordError');
        return !validationError;
    }

    handleConfirmPasswordBlur = event => {
        let confirmPassword;
        if(event){
            confirmPassword = event.target.value;
        }else{
            confirmPassword = this.getInputValuebyName('ConfirmPassword');
        }
        const password = this.getInputValuebyName('Password');
        const validationError = validateConfirmPassword(password, confirmPassword);
        
        this.handleValidationErrors(validationError, 'confirmPasswordError');
        return !validationError;

    }

    handleFirstnameBlur = event => {
        let firstname;
        if(event){
            firstname = event.target.value;
        }else{
            firstname = this.getInputValuebyName('Firstname');
        }
        const validationError = validateFirstname(firstname);

        this.handleValidationErrors(validationError, 'firstnameError');
        return !validationError;
    }

    handleLastnameBlur = event => {
        let lastname;
        if(event){
            lastname = event.target.value;
        }else{
            lastname = this.getInputValuebyName('Lastname');
        }
        const validationError = validateLastname(lastname);

        this.handleValidationErrors(validationError, 'lastwordError');
        return !validationError;
    }

    handleValidationErrors = (validationError, stateErrorProperty) => {
        if(this.state[stateErrorProperty] !== validationError){
            this.setState({
                [stateErrorProperty]: validationError
            });
        }
    }

    onSuccess = res => {
        const token = res.tokenObj.id_token;
        fetch('/api/user/google', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => {
            return res;
        })
        .then(res => res.json())
        .then(res => {
            this.props.dispatch(setUser(res));
        })
        .then(() => {
            this.setState({
                redirect: true,
            });
        });
    }
    onFailure = res => {
        console.log(res);
    }
    getInputValuebyName = name => {
        return document.querySelector(`input[name = ${name}]`).value;
    }

    getFormData = () => {
        const form = document.getElementById('signUP-form');
        return new FormData(form);
    }
    
    
    render(){
        const { 
            activeFormBlock,
            formBlockProgress,
            redirect,
            emailError,
            passwordError,
            confirmPasswordError,
            firstnameError,
            lastwordError,
        } = this.state;
        if(redirect || !!this.props.user){
            return <Redirect to='/' />
        }
        return(
            <div className={s.SignUp}>
                <Header title='Sign Up' />
                <View>
                    <Form id='signUP-form' active={activeFormBlock} >
                        <FormBlock>
                            <Input type='text' placeholder='Email *' name='Email' onBlur={this.handleEmailBlur} error={emailError} autocomplete='email' />
                            <Input type='password' placeholder='Password *' name='Password' onBlur={this.handlePasswordBlur} error={passwordError} autocomplete="new-password" />
                            <Input type='password' placeholder='Confirm Password *' name='ConfirmPassword' label="Confirm Password" onBlur={this.handleConfirmPasswordBlur} error={confirmPasswordError} autocomplete="new-password" />
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
                <div style={{display: 'flex', margin: '10px 0', justifyContent: 'space-around', height: 50}}>
                    <GoogleLogin
                        clientId="1064409062816-te616f091t5s0vh9mgnkacur1oqrqpr8.apps.googleusercontent.com"
                        onSuccess={this.onSuccess}
                        onFailure={this.onFailure}
                        isSignedIn={true}
                        style={{
                            display: 'block',
                            margin: '0 auto'
                        }}
                    />
                </div>
                <Account />
            </div>
        )
    }
}

export const Header = ({ title }) => {
    return(
        <div className={s.header}>
            <span className={s.headerText}>{title}</span>
        </div>
    )
}

export const View = ({ children }) => {
    return(
        <div className={s.view}>
            {children}
        </div>
    )
}

export const Controllers = ({ active, progress, onClick }) => {
    
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

export const ControllerButtons = ({ active, onClick, submit }) => {
    return(
        <div className={s.buttonContainer}>
            {active !== 0 && <button className={s.button} onClick={() => onClick(active - 1)}>Back</button> }
            {active < 1 && <button className={s.button} onClick={() => onClick(active + 1)}>Next</button>}
            {active === 1 && <button className={s.button} onClick={submit}>Sign Up</button>} 
        </div>
    )
}

export const Form = ({ id, active, children }) => {
    const FormWidth = window.innerWidth < 540 ? window.innerWidth : window.innerWidth > 1980 ? 900 : 540; // from SignUpForm.module.scss
    const style = {
        right: FormWidth * active
    };

    
    return(
        <form className={s.form} id={id} style={style}>
            {children}
        </form>
    )
}

export const FormBlock = ({ children }) => {
    return(
        <div className={s.formBlock}>
            {children}
        </div>
    )
}

export const Input = ({ type, placeholder, label , onBlur, name, error, autocomplete }) => {
    let props = { 
        className: s.input,
        type,
        placeholder,
        name,
        onBlur,
        autoComplete: autocomplete || 'on',
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

const Account = () => {
    return(
        <div className={s.account}>
            <p className={s.accountText}>Already have an account?</p>
            <NavLink to='/login'>Login Here</NavLink>
        </div>
    )
}

export default connect(mapStateToProps)(SignUpForm);