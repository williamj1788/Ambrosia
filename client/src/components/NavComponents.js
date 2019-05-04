import React from 'react';
import s from '../styles/Navbar.module.scss';
import logoIcon from '../images/Logo.png';
import cartIcon from '../images/CartIcon.png';

import HamburgerMenu from 'react-hamburger-menu';
import AccountLink from './AccountLink';

import { NavLink } from 'react-router-dom';

export const Navigation = ({ fixed, children }) => {
    return(
        <nav className={fixed ? s.fixed: undefined}>
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
            <NavLinkWrapper active exact to='/' >Home</NavLinkWrapper>
            <NavLinkWrapper active strict to='/menu'>Menu</NavLinkWrapper>
            <NavLinkWrapper active to='/meet' >Meet The Chiefs</NavLinkWrapper>
            <NavLinkWrapper icon={cartIcon}>Cart</NavLinkWrapper>
            <AccountLink />
        </div>
    )
}

export const HamburgerDropdown = ({ open }) => {
    let style = {};
    if(open){
        style.minHeight = 'fit-content';
        style.height = '200px';
    }else{
        style.height = '0';
        style.paddingBottom = '0';
    }
    return(
        <NavLinkContainer className={s.HamburgerDropdown} style={style} />
    )
}

export const NavLinkWrapper = ({ to, icon, exact, strict, active, children }) => {
    let props = { to };
    if(active){
        props.activeClassName = s.active;
    }
    if(exact){
        props.exact = true;
    }
    if(strict){
        props.strict = true
    }

    return(
        <div className={s.navLink}>
            {icon && <img className={s.linkLogo} src={icon} alt="nav-link icon" />}
            {to 
            ?<NavLink {...props}>{children}</NavLink>
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