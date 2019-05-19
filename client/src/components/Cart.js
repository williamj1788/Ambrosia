import React from 'react';
import s from '../styles/Cart.module.scss';
import Pizza from '../images/chef.jpg';
import { FaTimes } from 'react-icons/fa';

class Cart extends React.Component{
    render(){
        return(
            <div className={s.dark}>
                <div className={s.cart} >
                    <Header toggle={this.props.toggle} />
                    <OrderContainer />
                    <Footer />
                </div>
            </div>
        )
    }
}

const Header = ({ toggle }) => {
    return(
        <div className={s.header} >
            <span>Cart</span>
            <div className={s.close} onClick={toggle} >
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
            <button type='button' className={s.button} >Checkout</button>
        </div>
    )
}

const OrderContainer = () => {
    return(
        <div className={s.OrderContainer}>
            <Order />
            <Order />
            <Order />
            <Order />
            <Order />
            <Order />
            <Order />
        </div>
    )
};

const Order = () => {
    return(
        <div className={s.order}>
            <div className={s.orderInfo}>
                <p className={s.orderTitle}>Pizza1</p>
                <p>12.99</p>
                <select name="Qty">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </div>
            <button type='button' className={s.orderRemove} >Remove</button>
        </div>
    )
}

export default Cart;