import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import s from '../styles/Menu.module.scss';

import Pizza from '../images/Pizza_Background.jpg';
import Pasta from '../images/Money_icon.png';
import Drink from '../images/chef.jpg';

export class Menu extends React.Component{
    
    state = {
        productData: { // will load from a server when its set up
            pizza:[
                {
                    img: Pizza,
                    name: 'Tombstone Pizza',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '9.99',
                },
                {
                    img: Pizza,
                    name: 'Tombstone Pizza',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '7.99',
                },
                {
                    img: Pizza,
                    name: 'Tombstone Pizza',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '2.99',
                },
            ],
            pasta:[
                {
                    img: Pasta,
                    name: 'Tombstone passta',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '1.99',
                },
                {
                    img: Pasta,
                    name: 'Tombstone passta',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '12.99',
                },
                {
                    img: Pasta,
                    name: 'Tombstone passta',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '13.99',
                }
            ],
            drink:[
                {
                    img: Drink,
                    name: 'Tombstone drink',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '11.99',
                },
                {
                    img: Drink,
                    name: 'Tombstone drink',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '131.99',
                },
                {
                    img: Drink,
                    name: 'Tombstone drink',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '111.99',
                },
            ],
            bread:[],
            dessert:[]
        },
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
        const { redirect, productTarget, productData } = this.state;
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
                    <ProductContainer products={productData[this.props.match.params.product]}  />
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

export const ProductContainer = ({ products }) => {
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

export const Product = ({ img, name, description, price }) => {
    return(
        <div className={s.product}>
            <img className={s.productImg} src={img} alt="Product"/>
            <div className={s.productInfo}>
                <p className={s.productName}>{name}</p>
                <p className={s.productDesc}>{description}</p>
                <div className={s.productOrder}>
                    <span className={s.productPrice}>{price}</span>
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