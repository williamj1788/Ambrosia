import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearUser } from '../redux/action';
import { GoogleLogout } from 'react-google-login';
import s from '../styles/AccountDropdown.module.scss';

export class AccountDropdown extends React.Component{
    
    state = {
        redirect: null,
    }
    
    signOutUser = () => {
        return fetch('/api/user/signout', {
            credentials: 'include',
        }).then(() => {
            this.props.dispatch(clearUser());
        });
    }

    setRedirect = location => {
        this.setState({
            redirect: location,
        });
    }

    componentDidUpdate(){ // Set redirect back to null or less you get a infinate loop
        if(this.state.redirect){
            this.setState({
                redirect: null
            });
        }
    }
    
    render(){
        const { user, show } = this.props;
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to={redirect} />
        }
        let style = {
            height: window.innerWidth > 1000 ? user.admin ? '200px' : '100px' : user.admin ? '100px': '50px'
        };
        if(!show){
            if(window.innerWidth > 1000){
                style.height = '0';
            }else{
                style.width = '0';
            }
        }
        if(window.innerWidth < 1000 && user.admin){
            style.top = "-40px";
        }

        return(
            <div className={s.dropDown} style={style}>
                <div className={s.content}>
                    {user.admin && <Tab onClick={() => this.setRedirect('/admin/metrics')} text="Metrics" />} 
                    {user.admin && <Tab onClick={() => this.setRedirect('/admin/products')} text="Product" />} 
                    <Tab onClick={() => this.setRedirect('/user/orders')} text="Order History" />
                    <GoogleLogout
                        onLogoutSuccess={() => {}}
                        render={
                            renderProps => (
                                <div id='signout' className={s.tab} onClick={renderProps.onClick}>
                                    <div 
                                    onClick={this.signOutUser}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }} >
                                        <span>Sign Out</span>
                                    </div>
                                </div>
                            )
                        }
                    />
                </div>
            </div>
        )
    }
}

export const Tab = ({onClick, text}) => {
    return(
        <div className={s.tab} onClick={onClick} >
            <span>{text}</span>
        </div>
    )
}

export default connect(state => {
    return {user: state.user}
})(AccountDropdown);