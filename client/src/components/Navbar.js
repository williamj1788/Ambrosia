import React from 'react';
import s from '../styles/Navbar.module.scss';

import { 
    Navigation,
    NavContainer,
    NavLinkContainer,
    HamburgerDropdown,
    Hamburger,
    Logo,
 } from './NavComponents';

 import { connect } from 'react-redux';
 import { setUser } from '../redux/action';

 const mapStateToProps = state => {
     return {
         user: state.user
     }
 }

export class Navbar extends React.Component{
    
    state = {
        isFixed: false,
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

    componentDidMount(){
        if(!this.props.user){
            this.fetchUser();
        }
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

    fetchUser = () =>{
        fetch('/api/user', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
            if(!res.message){
                this.props.dispatch(setUser(res));
            }
        });
    }
    
    render(){
        const { isFixed, isHamburger,isHamburgerDropdownOpen } = this.state;
        const { page } = this.props;
        return(
            <Navigation fixed={isFixed}>
                <NavContainer transparent={page === 'Home' && !isFixed && !isHamburger}>
                    <Logo />
                    {isHamburger 
                    ?<Hamburger 
                        open={isHamburgerDropdownOpen} 
                        onClick={this.toggleHamburgerDropdown} 
                    />
                    :<NavLinkContainer className={s.linkContainer} />}
                </NavContainer>
                {isHamburger && <HamburgerDropdown open={isHamburgerDropdownOpen} />}
            </Navigation>
        )
    }
}

export default connect(mapStateToProps)(Navbar);