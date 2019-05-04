import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import s from '../styles/Products.module.scss';
import { FaTrashAlt } from "react-icons/fa";

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
                <input className={s.searchBar} type="text" placeholder="Search for prouduct" />
                <div className={s.productContainer} >
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                </div>
                <div className={s.dark}>
                    <div className={s.productModel} >  
                        <div className={s.header}>
                            <span>FakePizza</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

const Product = ({name, type}) => {
    return(
        <button className={s.product} type="button">
            <div className={s.icon}>
                <FaTrashAlt 
                size="1.5em"
                />
            </div>
            <span>{`${name} - ${type}`}</span>
        </button>
    )
}

export default connect(state => {
    return {user: state.user}
})(Products);