import React from 'react';
import s from '../styles/Navbar.module.scss';
import { withRouter } from'react-router-dom'

import { 
    Navigation,
    NavContainer,
    NavLinkContainer,
    HamburgerDropdown,
    Hamburger,
    Logo,
 } from './NavComponents';
 import Cart from './Cart';

export class Navbar extends React.Component{
    
    state = {
        isFixed: false,
        isHamburger: window.innerWidth < 1000,
        isHamburgerDropdownOpen: false,
        showCart: true
    }
    
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }

    handleScroll = () => {
        const currentScrollY = window.scrollY;
        const { isFixed } = this.state;
        const fixedTarget = 400;

        if(currentScrollY > fixedTarget && !isFixed){
            this.setState({
                isFixed: true,
                isHamburgerDropdownOpen: false,
            })
        }else if(currentScrollY < fixedTarget && isFixed){
            this.setState({
                isFixed: false,
                isHamburgerDropdownOpen: false,
            })
        }
    }

    handleResize = () => {
        const { isHamburger } = this.state;
        const HamburgerTarget = 1100; // 1100px
        if(window.innerWidth < HamburgerTarget && !isHamburger){
            this.setState({
                isHamburger: true,
            })
        }else if(window.innerWidth > HamburgerTarget && isHamburger){
            this.setState({
                isHamburger: false,
                isHamburgerDropdownOpen: false,
            })
        }
    }

    toggleHamburgerDropdown = () => {
        this.setState({
            isHamburgerDropdownOpen: !this.state.isHamburgerDropdownOpen,
        });
    }

    toggleCart = () => {
        this.setState({
            showCart: !this.state.showCart,
        })
    }
    
    render(){
        const { isFixed, isHamburger,isHamburgerDropdownOpen, showCart } = this.state;
        const { pathname } = this.props.location;
        return(
            <Navigation fixed={isFixed}>
                <NavContainer transparent={pathname === '/' && !isFixed && !isHamburger}>
                    <Logo />
                    {isHamburger 
                    ?<Hamburger 
                        open={isHamburgerDropdownOpen} 
                        onClick={this.toggleHamburgerDropdown} 
                    />
                    :<NavLinkContainer className={s.linkContainer} />}
                </NavContainer>
                {isHamburger && <HamburgerDropdown open={isHamburgerDropdownOpen} />}
                {showCart && <Cart />}
            </Navigation>
        )
    }
}

export default withRouter(Navbar);