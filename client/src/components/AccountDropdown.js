import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearUser } from '../redux/action'
import s from '../styles/AccountDropdown.module.scss';

class AccountDropdown extends React.Component{
    
    state = {
        redirect: false,
    }
    
    signOutUser = () => {
        fetch('/api/user/signout', {
            credentials: 'include',
        }).then(() => {
            this.props.dispatch(clearUser());
        });
    }

    redirectToOrder = () => {
        this.setState({
            redirect: true,
        });
    }

    componentDidUpdate(){
        if(this.state.redirect){
            this.setState({
                redirect: false
            });
        }
    }
    
    render(){
        if(this.state.redirect){
            return <Redirect to='/user/orders' />
        }
        
        
        let style = {
            height: window.innerWidth > 1000 ? '100px' : '50px'
        };
        if(!this.props.show){
            if(window.innerWidth > 1000){
                style.height = '0';
            }else{
                style.width = '0';
            }
        }

        return(
            <div className={s.dropDown} style={style}>
                <div className={s.content}>
                    <div className={s.tab} onClick={this.redirectToOrder} >
                        <span>Order History</span>
                    </div>
                    <div className={s.tab} onClick={this.signOutUser} >
                        <span>Sign Out</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {user: state.user}
})(AccountDropdown);