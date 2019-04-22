import React from 'react';
import s from '../styles/Navbar.module.scss';
import logoIcon from '../images/Logo.png';
import cartIcon from '../images/CartIcon.png';
import userIcon from '../images/UserIcon.png';

import HamburgerMenu from 'react-hamburger-menu';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const Navigation = ({ fixed, children }) => {
    return(
        <nav className={fixed ? s.fixed: undefined} >
            {children}
        </nav>
    )
}

export const NavContainer = ({ transparent, children }) => {
    let styles = {};
    if(transparent){
        styles.backgroundColor = 'transparent';
    }
    return (
        <div className={s.navbar} style={styles}>
            <div className={s.container} >
                {children}
            </div>
        </div>
    )
}

export const NavLinkContainer = ({ className, style = {} }) => {
    return(
        <div className={className} style={style} >
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/menu'>Menu</NavLink>
            <NavLink to='/meet' >Meet The Chiefs</NavLink>
            <NavLink icon={cartIcon}>Cart</NavLink>
            <NavLink to='/signup' icon={userIcon}>Sign up</NavLink>
        </div>
    )
}

export const HamburgerDropdown = ({ open }) => {
    let style = {};
    if(open){
        style.height = '200px';
    }else{
        style.height = '0';
        style.paddingBottom = '0';
    }
    return(
        <NavLinkContainer className={s.HamburgerDropdown} style={style} />
    )
}

// Export dumb component for testing

export class DumbNavLink extends React.Component{
    state = {
        redirect: false,
    }
    
    handleClick = () => {
        const { page, to } = this.props;
        if(to && page !== to){
            this.setState({redirect: true});
        }
    }

    render(){
        const { icon, page, children, to } = this.props;
        if(this.state.redirect){
            return <Redirect push to={to} />
        }
        return(
            <div className={s.navLink} onClick={this.handleClick}>
                {icon && <img className={s.linkLogo} src={icon} alt="nav-link icon" />}
                <span className={page === to ? s.active: undefined}>{children}</span>
            </div>
        )
    }
}
export const NavLink = connect(state => { return {page: state.page} })(DumbNavLink);


export const Logo = () => {
    return <img className={s.logo} src={logoIcon} alt="Logo" />
}

export const Hamburger = ({open, onClick}) => {
    return(
    <div style={{cursor: 'pointer'}}>
        <HamburgerMenu 
            isOpen={open}
            menuClicked={onClick}
            color={'#FF7300'}   
        />
    </div>
    )
}