import React from 'react';
import s from '../styles/SignUpForm.module.scss';

class SignUpForm extends React.Component{
    render(){
        return(
            <div className={s.SignUp}>
                <Header />
                <View>
                    <Form>
                        <FormBlock>
                            <Input  type='text' placeholder='Email *' />
                            <Input  type='password' placeholder='Password *' />
                            <Input  type='password' placeholder='Confirm Password *' />
                        </FormBlock>
                        <FormBlock>
                            <Input  type='text' placeholder='First Name *' />
                            <Input  type='text' placeholder='Last Name *' />
                            <Input  type='text' placeholder='Address' />
                        </FormBlock>
                    </Form>
                </View>

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

const Controllers = () => {
    return(
        <div>
            <button></button>
            <button></button>
        </div>
    )
}

const Form = ({ children }) => {
    return(
        <form className={s.form}>
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

const Input = ({ type, placeholder, onBlur, error }) => {
    return(
        <div className={s.inputContainer}>
            <input className={s.input} onBlur={onBlur} type={type} placeholder={placeholder} />
            {/* {error && <p>{error.message}</p>} */}
            { <p className={s.error}>Random Error Message</p> }
        </div>
    )
}

export default SignUpForm;