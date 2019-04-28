import React from 'react';
import s from '../styles/Login.module.scss';
import Navbar from './Navbar';
import { Header, Input } from './SignUpForm';

class Login extends React.Component{
    state = {
        emailError: null,
        passwordErro: null,
    }

    handleEmailBlur = event => {
        const email = event.target.value;

    }
    
    render(){
        return(
            <div>
                <Navbar />
                <div className={s.login}>
                    <Header title='Welcome Back' />
                    <form action="">
                        <Input type='text' placeholder="Enter Email Here" name="Email" />
                        <Input type='text' placeholder="Enter Password Here" name="Password" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;