import React from 'react';
import s from '../styles/Navbar.module.scss';
import logoIcon from '../images/Logo.png';
import cartIcon from '../images/CartIcon.png';
import userIcon from '../images/UserIcon.png';

import HamburgerMenu from 'react-hamburger-menu';

import { connect } from 'react-redux';

export const Navigation = ({ fixed, children }) => {
    return(
        <nav className={fixed ? s.fixed: undefined} >
            {children}
        </nav>
    )
}

export const NavContainer = ({ transparent, children }) => {
    let styles = {}
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
            <NavLink>Home</NavLink>
            <NavLink>Menu</NavLink>
            <NavLink>Meet The Chiefs</NavLink>
            <NavLink icon={cartIcon}>Cart</NavLink>
            <NavLink icon={userIcon}>Sign up</NavLink>
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
export const DumbNavLink = ({ icon, page, children }) => {
    return (
        <div className={s.navLink}>
            {icon && <img className={s.linkLogo} src={icon} alt="nav-link icon" />}
            <span className={page === children ? s.active: undefined}>{children}</span>
        </div>
    )
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