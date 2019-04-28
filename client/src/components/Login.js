import React from 'react';
import s from '../styles/Login.module.scss';
import Navbar from './Navbar';
import { Header } from './SignUpForm';

class Login extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
                <div className={s.login}>
                    <Header title='Login' />
                    
                </div>
            </div>
        )
    }
}

export default Login;