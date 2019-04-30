import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../redux/action';

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
class LoadUser extends React.Component{

    state = {
        loading: true,
    }

    componentDidMount(){
        if(!this.props.user){
            this.fetchUser()
            .then(() => {
                this.setState({
                    loading: false,
                })
            });
        }
    }

    fetchUser = () =>{
        return fetch('/api/user', {
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
        if(this.state.loading){
            return(
                <div>Loading...</div>
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