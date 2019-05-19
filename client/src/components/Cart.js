import React from 'react';
import s from '../styles/Cart.module.scss';
import Pizza from '../images/chef.jpg';
import { FaTimes } from 'react-icons/fa';

class Cart extends React.Component{
    render(){
        return(
            <div className={s.dark}>
                <div className={s.cart} >
                    <Header />
                    <Footer />
                </div>
            </div>
        )
    }
}

const Header = () => {
    return(
        <div className={s.header} >
            <span>Cart</span>
            <div className={s.close}>
                <FaTimes size='2em' />
            </div>
        </div>
    )
}

const Footer = () => {
    return(
        <div className={s.footer}>
            <div className={s.flexTotal}>
                <span>Sub Total:</span>
                <span>10.99</span>
            </div>
            <div className={s.flexTotal}>
                <span>Tax(6%):</span>
                <span>2.99</span>
            </div>
            <div className={s.flexTotal}>
                <span>Delivery fees:</span>
                <span>3.00</span>
            </div>
            <div className={s.flexTotal}>
                <span>Total:</span>
                <span>25.99</span>
            </div>
            <button className={s.button} >Checkout</button>
        </div>
    )
}

export default Cart;