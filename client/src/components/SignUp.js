import React from 'react';
import Navbar from './Navbar';
import s from '../styles/SignUp.module.scss';

import SaveIcon from '../images/save-icon.png';
import HistoryIcon from '../images/history-icon.png';
import CartIcon from '../images/Cart-icon-black.png';


class SignUp extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
                <div className={s.flexContainer}>
                    <AccountPerks />
                </div>
            </div>
        )
    }
}

const AccountPerks = () => {
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

const Perk = ({ img, text }) => {
    return(
        <div className={s.perk}>
            <img className={s.perkImg} src={img} alt="Perk"/>
            <p className={s.perkText}>{text}</p>
        </div>
    )
}

export default SignUp;