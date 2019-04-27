import React from 'react';
import s from '../styles/SignUpForm.module.scss';

class SignUpForm extends React.Component{
    
    state = {
        activeFormBlock: 0,
        formBlockProgress: 0,
        emailError: false
    }

    setActiveFromBlock = target => {
        let newState = {
            activeFormBlock: target
        }
        if(target > this.state.formBlockProgress){
            newState.formBlockProgress = target
        }
        this.setState(newState);
    }

    handleSubmit = () => {
        console.log('TODO');
    }

    validateEmail = () => {
        const { emailError } = this.state;
        const emailValue = document.querySelector('input[name = Email]').value;
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isValid = emailRegex.test(emailValue);
        
        if(isValid && emailError){
            this.setState({
                emailError: false,
            });
        }else if(!isValid && !emailError){
            this.setState({
                emailError: 'Invalid Email'
            });
        }
    }
    
    render(){
        const { 
            activeFormBlock,
            formBlockProgress ,
            emailError,
        } = this.state;
        return(
            <div className={s.SignUp}>
                <Header />
                <View>
                    <Form id='signUP-form' active={activeFormBlock} >
                        <FormBlock>
                            <Input type='text' placeholder='Email *' name='Email'onBlur={this.validateEmail} error={emailError} />
                            <Input id='password' type='password' placeholder='Password *' name='Password' />
                            <Input type='password' placeholder='Confirm Password *' name='ConfirmPassword' />
                        </FormBlock>
                        <FormBlock>
                            <Input  type='text' placeholder='First Name *' name='Firstname' />
                            <Input  type='text' placeholder='Last Name *' name='Lastname' />
                            <Input  type='text' placeholder='Address' name='Address' />
                        </FormBlock>
                    </Form>
                </View>
                <Controllers active={activeFormBlock} progress={formBlockProgress} setActive={this.setActiveFromBlock} />
                <ControllerButtons active={activeFormBlock} setActive={this.setActiveFromBlock} submit={this.handleSubmit} />
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

const Controllers = ({ active, progress, setActive }) => {
    
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
        buttons.push(<button onClick={state === 'visted' ? () => setActive(i) : undefined} className={`${s.controller} ${s[state]}`} ></button>);
    }

    return(
        <div className={s.controllerContainer}>
            {buttons}
        </div>
    )
}

const ControllerButtons = ({ active, setActive, submit }) => {
    return(
        <div className={s.buttonContainer}>
            {active !== 0 && <button className={s.button} onClick={() => setActive(--active)}>Back</button> }
            {active < 1 && <button className={s.button} onClick={() => setActive(++active)}>Next</button>}
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

const Input = ({ type, placeholder, onBlur, id, name, error }) => {
    let props = { 
        className: s.input,
        type,
        placeholder,
        name,
        onBlur,
    };
    if(id){
        props.id = id;
    }
    if(error){
        props.style = {
            border: '2px solid red'
        }
    }
    return(
        <div className={s.inputContainer}>
            <input {...props} />
            {error && <p className={s.error}>{error}</p>}
        </div>
    )
}

export default SignUpForm;