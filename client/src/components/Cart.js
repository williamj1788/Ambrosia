import React from 'react';
import s from '../styles/Cart.module.scss';
import Pizza from '../images/chef.jpg';
import { FaTimes } from 'react-icons/fa';

class Cart extends React.Component{
    
    state = {
        orders: [
            {
                name: 'pizza1',
                price: 32.99,
                qty: 1
            },
            {
                name: 'pizza2',
                price: 20.99,
                qty: 3
            },
            {
                name: 'pizza3',
                price: 6.99,
                qty: 1
            },
            {
                name: 'pizza4',
                price: 7.99,
                qty: 4
            },
            {
                name: 'pizza5',
                price: 9.99,
                qty: 2
            },
            {
                name: 'pizza6',
                price: 22.99,
                qty: 1
            },
            {
                name: 'pizza7',
                price: 10.99,
                qty: 3
            },
            {
                name: 'pizza8',
                price: 32.99,
                qty: 1
            },
            {
                name: 'pizza9',
                price: 20.99,
                qty: 3
            },
            {
                name: 'pizza10',
                price: 6.99,
                qty: 1
            },
            {
                name: 'pizza11',
                price: 7.99,
                qty: 4
            },
            {
                name: 'pizza12',
                price: 9.99,
                qty: 2
            },
            {
                name: 'pizza13',
                price: 22.99,
                qty: 1
            },
            {
                name: 'pizza14',
                price: 10.99,
                qty: 3
            }
        ],
        active: 1,
    }

    removeOrder = index => {
        const orders = this.state.orders.slice();
        orders.splice(index,1);
        this.setState({ orders });
    }

    setActive = value => {
        this.setState({active: value});
    }
    
    render(){
        return(
            <div className={s.dark}>
                <div className={s.cart}>
                    <Header toggle={this.props.toggle} />
                    <OrderContainer 
                    orders={this.state.orders} 
                    remove={this.removeOrder} 
                    active={this.state.active}
                    setActive={this.setActive}  />
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

const OrderContainer = ({ orders, remove, active, setActive }) => {
    const MaxOrders = 7;
    let  curOrders = orders.slice((MaxOrders * (active - 1)), (MaxOrders * active));
    curOrders = curOrders.map((order, index) => {
        return <Order key={index} id={index} remove={remove} {...order} />
    });

    let counters = [];
    for(let i = 1; i <= Math.ceil(orders.length / MaxOrders); i++){
        counters.push(<button onClick={() => setActive(i)} className={`${s.counter} ${active === i && s.active}`}>{i}</button>);
    };
    
    return(
        <div className={s.OrderContainer}>
            {curOrders}
            <div className={s.counterCounter}>
                {counters}
            </div>
        </div>
    )
};

const Order = ({ name, price, qty, id, remove }) => {
    return(
        <div className={s.order}>
            <div className={s.orderInfo}>
                <p className={s.orderTitle}>{name}</p>
                <p>{price}</p>
                <select defaultValue={qty} name="Qty">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </div>
            <button type='button' className={s.orderRemove} onClick={() => remove(id)} >Remove</button>
        </div>
    )
}

export default Cart;