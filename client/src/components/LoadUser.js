import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../redux/action';

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export class LoadUser extends React.Component{

    state = {
        loading: true,
    }

    componentDidMount(){  
        if(!this.props.user){
            this.loadUser();
        }
    }

    loadUser = () => {
        return this.fetchUser()
        .then(res => {
            if(!res.message){
                this.props.dispatch(setUser(res));
            }
        })
        .then(() => this.setLoading(false))
        .catch(this.loadUser);
    }

    fetchUser = () =>{
        return fetch('/api/user', { credentials: 'include' })
        .then(res => res.json())
    }

    setLoading = value => {
        this.setState({loading: value});
    }

    render(){
        if(this.state.loading){
            return(
                <div className='loading'>Loading...</div>
            )
        }
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}
export default connect(mapStateToProps)(LoadUser)