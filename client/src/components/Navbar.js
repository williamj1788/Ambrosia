import React from 'react';
import s from '../styles/Home.module.scss';
import logoIcon from '../images/Logo.png';
import cartIcon from '../images/CartIcon.png';
import userIcon from '../images/UserIcon.png';

class Navbar extends React.Component{
    
    state = {
        isExtended: false,
    }
    
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const currentScrollY = window.scrollY;
        const { isExtended } = this.state;
        const ExtendedTarget = 400;

        if(currentScrollY > ExtendedTarget && !isExtended){
            this.setState({
                isExtended: true,
            })
        }else if(currentScrollY < ExtendedTarget && isExtended){
            this.setState({
                isExtended: false,
            })
        }
    }
    
    render(){
        const { isExtended } = this.state;
        const { page } = this.props;
        return(
            <NavContainer page={page} isExtended={isExtended} >
                <img className={s.logo} src={logoIcon} alt="Logo" />
                <div className={s.linkContainer} >
                    <NavLink>Home</NavLink>
                    <NavLink>Menu</NavLink>
                    <NavLink>Meet The Chiefs</NavLink>
                    <NavLink>Home</NavLink>
                    <NavLink icon={cartIcon} >Cart</NavLink>
                    <NavLink icon={userIcon} >Sign up</NavLink>
                </div>
            </NavContainer>
        )
    }
}

const NavContainer = ({isExtended, page, ...props}) => {
    const styles = {}
    if(page === 'home' && !isExtended){
        styles.backgroundColor = 'transparent';
    }
    return (
        <nav className={`${s.navbar} ${isExtended && s.fixed}`} style={styles}>
            <div className={s.container} >
                {props.children}
            </div>
        </nav>
    )
}

const NavLink = ({icon, ...props}) => {
    return (
        <div className={s.navLink}>
            {icon && <img className={s.linkLogo} src={icon} alt="nav-link icon" />}
            {props.children}
        </div>
    )
}

export default Navbar;