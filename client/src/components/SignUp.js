import React from 'react';

import Navbar from './shared/Navbar';
import SignUpForm from './shared/SignUpForm';
import s from '../styles/SignUp.module.scss';
import Content from './shared/Content';

import SaveIcon from '../images/save-icon.png';
import HistoryIcon from '../images/history-icon.png';
import CartIcon from '../images/Cart-icon-black.png';


export class SignUp extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
                <Content>
                    <div className={s.flexContainer}>
                        <AccountPerks />
                        <SignUpForm />
                    </div>
                </Content>
            </div>
        )
    }
}

export const AccountPerks = () => {
    return(
        <div className={s.accountPerks}>
            <Perk 
            img={SaveIcon}
            text={'Save Items in cart'}
            />
            <Perk 
            img={CartIcon}
            text={'Checkout Items'}
            />
            <Perk 
            img={HistoryIcon}
            text={'View past Orders'}
            />
        </div>
    )
}


export const Perk = ({ img, text }) => {
    return(
        <div className={s.perk}>
            <img className={s.perkImg} src={img} alt="Perk"/>
            <p className={s.perkText}>{text}</p>
        </div>
    )
}



export default SignUp;