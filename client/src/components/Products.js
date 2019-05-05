import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { setProducts } from '../redux/action';
import { Redirect } from 'react-router-dom';
import s from '../styles/Products.module.scss';
import { FaTrashAlt } from "react-icons/fa";
import ProductModal from './ProductModal';

class Products extends React.Component{
    
    state = {
        loading: true,
        redirect: false,
        showProductModal: false,
    }
    
    componentDidMount(){
        this.fetchProducts();
    }

    fetchProducts = () => {
        fetch('/api/admin/products')
        .then(res => res.json())
        .then(res => this.props.dispatch(setProducts(res)))
        .then(() => {
            this.setState({
                loading: false,
            });
        })
        .catch(error => console.log(error));;
    }

    checkAdmin = () => {
        if(this.props.user){
            if(!this.props.user.admin){
                this.setState({
                    redirect: true,
                });
            }
        }else{
            this.setState({
                redirect: true,
            });
        }
    }

    toggleProductModal = () => {
        this.setState({
            showProductModal: !this.state.showProductModal
        })
    }
    
    render(){
        const { loading, redirect, showProductModal } = this.state
        if(redirect){
            return <Redirect to='/' />
        }
        if(loading){
            return <div>Loading...</div>
        }

        return(
            <div>
                <Navbar />
                <div className={s.content}>
                    <h1 className={s.title}>Products</h1>
                    <button onClick={this.toggleProductModal} className={s.createButton} type="button">Create A Product</button>
                    <input className={s.searchBar} type="text" placeholder="Search for prouduct" />
                    <ProductContainer products={this.props.products} />
                    {showProductModal && <ProductModal show={this.toggleProductModal} />}
                </div>
            </div>
        )
    }
}

const ProductContainer = ({ products }) => {
    products = products.map(product => {
        return <Product name={product.name} type={product.type} />
    });
    return(
        <div className={s.productContainer}>
            {products}
        </div>
    )
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
    return {
        user: state.user,
        products: state.products,
    }
})(Products);