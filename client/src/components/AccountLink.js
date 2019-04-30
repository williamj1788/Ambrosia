import React from 'react';
import { connect } from 'react-redux';
import userIcon from '../images/UserIcon.png';
import UserArrow from '../images/Account-arrow.png';
import s from '../styles/Navbar.module.scss';
import { NavLinkWrapper } from './NavComponents';
import AccountDropdown from './AccountDropdown';

class AccountLink extends React.Component{
    
    state = {
        showDropdown: false,
    }
    
    toggleDropdown = () =>{
        this.setState({
            showDropdown: !this.state.showDropdown
        });
    }

    render(){
        const { user } = this.props;
        const { showDropdown } = this.state
        if(user){
            return(
                <div style={{position: 'relative'}} >
                    <div className={s.navLink} style={{cursor: 'pointer'}} onClick={this.toggleDropdown} >
                        <img className={s.linkLogo} src={userIcon} alt="User Icon" />
                        <span>{user.firstname}</span>
                        <img className={s.userArrow} src={UserArrow} alt="User Arrow"/>
                    </div>
                    <AccountDropdown show={showDropdown} />
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