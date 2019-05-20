import React from 'react';
import s from '../styles/Cart.module.scss';
import { connect } from 'react-redux';
import { editOrder, removeOrder } from '../redux/action';
import { FaTimes } from 'react-icons/fa';
import uuid from 'uuid';

class Cart extends React.Component{
    
    state = {
        active: 1,
    }

    removeOrder = id => {
        this.props.dispatch(removeOrder(id));
        console.log(id);
    }

    editOrder = (id, qty) => {
        this.props.dispatch(editOrder({id,qty}));
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
                    orders={this.props.orders} 
                    remove={this.removeOrder}
                    edit={this.editOrder}
                    active={this.state.active}
                    setActive={this.setActive}  />
                    <Footer orders={this.props.orders}  />
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

const Footer = ({ orders }) => {
    let subTotal = orders.reduce((acc, val) => {
        return acc + (val.price * val.qty);
    }, 0);

    let tax = subTotal * 0.06;

    let deliveryFee = 3;

    let total = subTotal + tax + deliveryFee;

    return(
        <div className={s.footer}>
            <div className={s.flexTotal}>
                <span>Sub Total:</span>
                <span>{'$' + subTotal.toFixed(2)}</span>
            </div>
            <div className={s.flexTotal}>
                <span>Tax(6%):</span>
                <span>{'$' + tax.toFixed(2)}</span>
            </div>
            <div className={s.flexTotal}>
                <span>Delivery fees:</span>
                <span>{'$' + deliveryFee.toFixed(2)}</span>
            </div>
            <div className={s.flexTotal}>
                <span>Total:</span>
                <span>{'$' + total.toFixed(2)}</span>
            </div>
            <button type='button' className={s.button} >Checkout</button>
        </div>
    )
}

const OrderContainer = ({ orders, remove, edit, active, setActive }) => {
    const MaxOrders = 7;
    let  curOrders = orders.slice((MaxOrders * (active - 1)), (MaxOrders * active));
    curOrders = curOrders.map((order) => {
        return <Order key={order.id} remove={remove} edit={edit} {...order} />
    });

    if(curOrders.length < 1 && active != 1){
        setActive(active - 1);
    }

    let counters = [];
    for(let i = 1; i <= Math.ceil(orders.length / MaxOrders); i++){
        counters.push(<button key={uuid()} onClick={() => setActive(i)} className={`${s.counter} ${active === i && s.active}`}>{i}</button>);
    };
    
    return(
        <div className={s.OrderContainer}>
            {curOrders}
            <div className={s.counterCounter}>
                {counters.length > 1 && counters}
            </div>
        </div>
    )
};

const Order = ({ name, price, qty, id, remove, edit }) => {
    return(
        <div className={s.order}>
            <div className={s.orderInfo}>
                <p className={s.orderTitle}>{name}</p>
                <p>{price}</p>
                <select onChange={event => edit(id, event.target.value)} defaultValue={qty} name="Qty">
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

export default connect(state => {
    return{
        orders: state.orders
    }
} )(Cart);