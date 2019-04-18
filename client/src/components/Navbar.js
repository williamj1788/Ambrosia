import React from 'react';
import s from '../styles/Navbar.module.scss';
import logoIcon from '../images/Logo.png';
import cartIcon from '../images/CartIcon.png';
import userIcon from '../images/UserIcon.png';
import HamburgerMenu from 'react-hamburger-menu';

class Navbar extends React.Component{
    
    state = {
        isExtended: false,
        isHamburger: window.innerWidth < 1000,
        isHamburgerDropdownOpen: false,
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
        const { isExtended } = this.state;
        const ExtendedTarget = 400;

        if(currentScrollY > ExtendedTarget && !isExtended){
            this.setState({
                isExtended: true,
                isHamburgerDropdownOpen: false,
            })
        }else if(currentScrollY < ExtendedTarget && isExtended){
            this.setState({
                isExtended: false,
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
    
    render(){
        const { isExtended, isHamburger,isHamburgerDropdownOpen } = this.state;
        const { page } = this.props;
        return(
            <nav className={isExtended && s.fixed}>
                <NavContainer 
                    transparent={page === 'home' && !isExtended && !isHamburger} 
                    isExtended={isExtended} 
                    >
                    <img className={s.logo} src={logoIcon} alt="Logo" />
                    {isHamburger
                    ? <HamburgerMenu 
                        isOpen={isHamburgerDropdownOpen}
                        menuClicked={this.toggleHamburgerDropdown}
                        color={'#FF7300'}   
                    />
                    : <NavLinkContainer className={s.linkContainer} />
                    }
                </NavContainer>
                {isHamburger && <HamburgerDropdown open={isHamburgerDropdownOpen} />}
            </nav>
        )
    }
}

const NavContainer = ({isExtended, transparent, ...props}) => {
    const styles = {}
    if(transparent){
        styles.backgroundColor = 'transparent';
    }
    return (
        <div className={s.navbar} style={styles}>
            <div className={s.container} >
                {props.children}
            </div>
        </div>
    )
}

const NavLinkContainer = ({ className, style = {} }) => {
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

const HamburgerDropdown = ({ open }) => {
    const style = {};
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

const NavLink = ({icon, ...props}) => {
    return (
        <div className={s.navLink}>
            {icon && <img className={s.linkLogo} src={icon} alt="nav-link icon" />}
            <span>{props.children}</span>
        </div>
    )
}

export default Navbar;