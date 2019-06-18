import React from 'react';
import s from '../styles/Login.module.scss';
import Navbar from './shared/Navbar';
import { Header, Input } from './shared/SignUpForm';
import { 
    validateEmail,
    validatePassword,
 } from '../validator';
 import GoogleLogin from 'react-google-login';
 import { NavLink, Redirect } from 'react-router-dom';
 import { connect } from 'react-redux';
 import { setUser } from '../redux/action';
 import keys from '../key'

 const mapStateToProps = state => {
    return {
        user: state.user
    }
}


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            emailError: null,
            passwordError: null,
            serverError: null,
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const isEmailValid = await this.handleEmailBlur();
        const isPasswordValid = this.handlePasswordBlur();
        if(isEmailValid && isPasswordValid){
            await this.loginUser()
            .then(user => {
                this.props.dispatch(setUser(user));
            })
            .catch(message => {
                this.setState({
                    serverError: message
                })
            });
        }
    }

    handleEmailBlur = async event => {
        let email;
        if(event){
            email = event.target.value;
        }else{
            email = this.getInputValuebyName('Email');
        }
        const validationError = await validateEmail(email);
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

    loginUser = () => {
        console.log('sdfsd');
        return new Promise((resolve, reject) => {
            fetch('/api/user/login', {
                method: 'POST',
                body: this.getFormData(),
            })
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    reject(res.error);
                }else{
                    resolve(res);
                }
            });
        })
    }

    onSuccess = res => {
        const token = res.tokenObj.id_token;
        this.loginWithGoogle(token)
        .then(res => this.props.dispatch(setUser(res)))
        .then(this.setRedirect(true));
    }
    onFailure = res => {
        console.log(res);
    }

    loginWithGoogle = token => {
        console.log('sdfsdfddd')
        return fetch('/api/user/google', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => res.json())
    }

    setRedirect = value => {
        this.setState({redirect: value});
    }

    getInputValuebyName = name => {
        return document.querySelector(`input[name = ${name}]`).value;
    }

    getFormData = () => {
        const form = document.getElementById('login-form');
        return new FormData(form);
    }
    
    render(){
        const { emailError, passwordError, serverError } = this.state;
        if(!!this.props.user){
            return <Redirect to='/' />
        }
        return(
            <div>
                <Navbar />
                <div className={s.login}>
                    <Header title='Welcome Back' />
                    <form id='login-form' onSubmit={this.handleSubmit} className={s.form}>
                        <Input type='text' name="Email" onBlur={this.handleEmailBlur} error={emailError} autocomplete="email" />
                        <Input type='password' name="Password" onBlur={this.handlePasswordBlur} error={passwordError} autocomplete='current-password' />
                        {serverError && <p style={{margin: 0, color: 'red', textAlign: 'center'}}>{serverError}</p> }
                        <button className={s.button} type='submit' >Login</button>
                    </form>
                    <div style={{display: 'flex', margin: '10px 0', justifyContent: 'space-around', height: 50, fontSize: '1.2rem'}}>
                    <GoogleLogin
                    clientId={keys.clientID}
                    buttonText="Login with Google"
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    isSignedIn={true}
                    style={{fontSize: '1.2rem'}}
                    />
                    </div>
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

export default connect(mapStateToProps)(Login);