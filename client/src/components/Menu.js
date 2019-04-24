import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import s from '../styles/Menu.module.scss';

import Pizza from '../images/Pizza_Background.jpg';

export class Menu extends React.Component{
    
    state = {
        productData: null,
        redirect: false,
        productTarget: null,
    }

    redirectToProduct = productTarget => {
        this.setState({
            redirect: true,
            productTarget,
        });
    }

    componentDidUpdate(){
        // set state back to default or else you get a infinite redirect loop
        if(this.state.redirect){
            this.setState({
                redirect: false,
                productTarget: null,
            });
        }
    }
    
    render(){
        const { redirect, productTarget } = this.state;
        if(redirect){ 
            return <Redirect to={`/menu/${productTarget}`} /> 
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
                    <ProductContainer />
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

const ProductContainer = () => {
    return(
        <div className={s.productContainer} >
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
        </div>
    )
}

const Product = () => {
    return(
        <div className={s.product}>
            <img className={s.productImg} src={Pizza} alt="Product"/>
            <div className={s.productInfo}>
                <p className={s.productName}>Tombstone Pizza</p>
                <p className={s.productDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,</p>
                <div className={s.productOrder}>
                    <span className={s.productPrice}>7.99</span>
                    <form className={s.productForm}>
                    <label className={s.productLabel} htmlFor="quantity">Qty:</label>
                        <select className={s.productSelect} defaultValue='1' name="quantity">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                        <button type='submit' className={s.productButton}>Place Order</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default connect()(Menu);