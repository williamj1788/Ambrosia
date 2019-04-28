import React from 'react';
import s from '../styles/Login.module.scss';
import Navbar from './Navbar';
import { Header, Input } from './SignUpForm';
import { 
    validateEmail,
    validatePassword,
 } from './validator';
 import { NavLink } from 'react-router-dom';

class Login extends React.Component{
    
    state = {
        emailError: null,
        passwordError: null,
    }

    handleSubmit = event => {
        event.preventDefault();

        const isEmailValid = this.handleEmailBlur();
        const isPasswordValid = this.handlePasswordBlur();
        if(isEmailValid && isPasswordValid){
            console.log('todo');
        }
    }

    handleEmailBlur = event => {
        let email;
        if(event){
            email = event.target.value;
        }else{
            email = this.getInputValuebyName('Email');
        }
        const validationError = validateEmail(email);
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

    handleValidationErrors = (validationError, stateErrorProperty) => {
        if(this.state[stateErrorProperty] !== validationError){
            this.setState({
                [stateErrorProperty]: validationError
            });
        }
    }

    getInputValuebyName = name => {
        return document.querySelector(`input[name = ${name}]`).value;
    }
    
    render(){
        const { emailError, passwordError } = this.state;
        return(
            <div>
                <Navbar />
                <div className={s.login}>
                    <Header title='Welcome Back' />
                    <form onSubmit={this.handleSubmit} className={s.form}>
                        <Input type='text' name="Email" onBlur={this.handleEmailBlur} error={emailError} autocomplete="email" />
                        <Input type='text' name="Password" onBlur={this.handlePasswordBlur} error={passwordError} autocomplete='current-password' />
                        <button className={s.button} type='submit' >Login</button>
                    </form>
                    <Account accountText="Don't have an account?" linkText='Sign Up here' to='/signup' />
                </div>
            </div>
        )
    }
}
const Account = () => {
    return(
        <div className={s.account}>
            <p className={s.accountText}>Don't have an account?</p>
            <NavLink to='/signup'>Sign up here</NavLink>
        </div>
    )
}

export default Login;