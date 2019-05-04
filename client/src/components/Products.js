import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import s from '../styles/Products.module.scss';
import { FaTrashAlt } from "react-icons/fa";
import ProductModal from './ProductModal';

class Products extends React.Component{
    
    state = {
        redirect: false,
        showProductModal: false,
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

    toggleProductModal = () => {
        this.setState({
            showProductModal: !this.state.showProductModal
        })
    }
    
    render(){
        const { redirect, showProductModal } = this.state
        if(redirect){
            return <Redirect to='/' />
        }

        return(
            <div>
                <Navbar />
                <h1 className={s.title}>Products</h1>
                <button onClick={this.toggleProductModal} className={s.createButton} type="button">Create A Product</button>
                <input className={s.searchBar} type="text" placeholder="Search for prouduct" />
                <div className={s.productContainer} >
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                </div>
               {showProductModal && <ProductModal show={this.toggleProductModal} />}
            </div>
        )
    }
}

const Product = ({name, type}) => {
    return(
        <div>
            <button className={s.product} type="button">
                <div className={s.icon}>
                    <FaTrashAlt 
                    size="1.5em"
                    />
                </div>
                <span>{`${name} - ${type}`}</span>
            </button>
            <button className={s.deal}>
                <span> Click to add Deal</span>
            </button>
        </div>
    )
}

export default connect(state => {
    return {user: state.user}
})(Products);