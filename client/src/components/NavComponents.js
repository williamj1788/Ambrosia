import React from 'react';
import s from '../styles/Navbar.module.scss';
import logoIcon from '../images/Logo.png';
import cartIcon from '../images/CartIcon.png';
import userIcon from '../images/UserIcon.png';

import HamburgerMenu from 'react-hamburger-menu';

import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

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
            <NavLinkWrapper to='/' >Home</NavLinkWrapper>
            <NavLinkWrapper to='/menu/pizza'>Menu</NavLinkWrapper>
            <NavLinkWrapper to='/meet' >Meet The Chiefs</NavLinkWrapper>
            <NavLinkWrapper icon={cartIcon}>Cart</NavLinkWrapper>
            <NavLinkWrapper to='/signup' icon={userIcon}>Sign up</NavLinkWrapper>
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

export const NavLinkWrapper = ({ to, icon, children }) => {
    return(
        <div className={s.navLink}>
            {icon && <img className={s.linkLogo} src={icon} alt="nav-link icon" />}
            {to 
            ?<NavLink exact strict to={to} activeClassName={s.active}>{children}</NavLink>
            :<span style={{cursor: 'pointer'}}>{children}</span>
            }
        </div>
    )
}


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