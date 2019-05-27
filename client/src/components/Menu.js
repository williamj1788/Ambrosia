import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setProducts } from '../redux/action';
import s from '../styles/Menu.module.scss';

import Product from './MenuProduct';

export class Menu extends React.Component{
    
    state = {
        loading: !this.props.products,
        redirect: false,
        productTarget: null,
    }

    redirectToProduct = productTarget => {
        sessionStorage.setItem('scroll',window.scrollY);
        this.setState({
            redirect: true,
            productTarget,
        });
    }

    componentDidMount(){
        if(!this.props.products){
            this.fetchProducts();
        }
    }

    componentDidUpdate(){
        window.scrollTo(0, parseInt(sessionStorage.getItem('scroll')));
        
        // set state back to default or else you get a infinite redirect loop
        if(this.state.redirect){
            this.setState({
                redirect: false,
                productTarget: null,
            });
        }
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
        .catch(console.log);
    }

    getProductsByType = type => {
        return this.props.products.filter(product => product.type === type);
    }



    render(){
        const { redirect, productTarget, loading } = this.state;
        if(redirect){ 
            return <Redirect to={`/menu/${productTarget}`} /> 
        }

        if(loading){
            return <div>Loading...</div>
        }
        return(
            <div>
                <Navbar />
                <div className={s.content}>
                    <h1 className={s.title}>Menu</h1>
                    <TabContainer redirect={this.redirectToProduct} productPage={this.props.match.params.product} >
                        <Tab product='pizza'>Pizza</Tab>
                        <Tab product='pasta'>Pasta</Tab>
                        <Tab product='bread'>Bread</Tab>
                        <Tab product='dessert'>Desserts</Tab>
                        <Tab product='drink'>Drinks</Tab>
                    </TabContainer>
                    <ProductContainer products={this.getProductsByType(this.props.match.params.product)} />
                </div>
            </div>
        )
    }
}

function giveChildrenProps(children, props) {
    return React.Children.map(children, child => {
        return React.cloneElement(child, props);
    });
}

const TabContainer = ({ redirect, productPage, children }) => {
    children = giveChildrenProps(children, { redirect, productPage });
    return(
        <div className={s.tabContainer}>
            {children}
        </div>
    )
}

const Tab = ({ productPage, redirect, product, children }) => {
    return(
        <button onClick={productPage !== product ? () =>{ redirect(product) } : undefined} className={`${s.tab} ${productPage === product ? s.active : ''}`}>{children}</button>
    )
} 

export const ProductContainer = ({ products, createOrder }) => {
    return(
        <div className={s.productContainer} >
            {products.map((product, index) => {
                return(
                    <Product key={index} {...product} />
                )
            })}
        </div>
    )
}

export default connect(state => {
    return{
        products: state.products,
        orders: state.orders,
    }
})(Menu);