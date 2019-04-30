import React from 'react';
import { connect } from 'react-redux';
import { clearUser } from '../redux/action'
import userIcon from '../images/UserIcon.png';
import UserArrow from '../images/Account-arrow.png';
import s from '../styles/Navbar.module.scss';
import { NavLinkWrapper } from './NavComponents';

class AccountLink extends React.Component{
    
    signOutUser = () => {
        fetch('/api/user/signout', {
            credentials: 'include',
        }).then(() => {
            this.props.dispatch(clearUser());
        });
    }
    
    render(){
        const { user } = this.props
        if(user){
            return(
                <div>
                    <div className={s.navLink} style={{cursor: 'pointer'}} onClick={this.signOutUser} >
                        <img className={s.linkLogo} src={userIcon} alt="User Icon" />
                        <span>{user.firstname}</span>
                        <img className={s.userArrow} src={UserArrow} alt="User Arrow"/>
                    </div>
                </div>
            )
        }
        return(
            <NavLinkWrapper to='/login' icon={userIcon}>Login</NavLinkWrapper>
        )
    }
}




export default connect(state => {
    return {user: state.user}
})(AccountLink);