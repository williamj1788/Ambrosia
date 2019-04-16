import React from 'react';
import s from '../styles/Home.module.scss';
import logoIcon from '../images/Logo.png';
import cartIcon from '../images/CartIcon.png';
import userIcon from '../images/UserIcon.png';

class Navbar extends React.Component{
    
    state = {
        extended: false
    }
    
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const currentScrollY = window.scrollY;
        const { extended } = this.state;

        if(currentScrollY > 100 && !extended){
            this.setState({
                extended: true,
            })
        }else if(currentScrollY < 100 && extended){
            this.setState({
                extended: false,
            })
        }
    }
    
    render(){
        return(
            <nav className={s.navbar} style={this.state.extended ? {top: '0'}: null} >
                <div className={s.container} >
                    <img className={s.logo} src={logoIcon} alt="Logo" />
                    <div className={s.linkContainer} >
                        <span className={s.navLink} >Home</span>
                        <span className={s.navLink} >Menu</span>
                        <span className={s.navLink} >Meet The Chiefs</span>
                        <div className={s.navLink}>
                            <img className={s.linkLogo} src={cartIcon} alt="Cart logo" />
                            <span>Cart</span> 
                        </div>
                        <div className={s.navLink}>
                            <img className={s.linkLogo} src={userIcon} alt="Cart logo" />
                            <span>Sign up</span> 
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;