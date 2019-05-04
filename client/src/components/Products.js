import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import s from '../styles/Products.module.scss';

class Products extends React.Component{
    
    state = {
        redirect: false,
    }
    
    componentDidMount(){
        // if(this.props.user){
        //     if(!this.props.user.admin){
        //         this.setState({
        //             redirect: true,
        //         });
        //     }
        // }else{
        //     this.setState({
        //         redirect: true,
        //     });
        // }
    }
    
    
    render(){
        if(this.state.redirect){
            return <Redirect to='/' />
        }

        return(
            <div>
                <Navbar />
                <h1 className={s.title}>Products</h1>
                <button className={s.createButton} type="button">Create A Product</button>
                <input className={s.searchBar} type="text"/>
                <div>
                    <button type="button">
                        FakePizza
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {user: state.user}
})(Products);