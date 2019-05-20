import React from 'react';
import { connect } from 'react-redux';
import { addOrder, removeOrder } from '../redux/action';
import s from '../styles/Menu.module.scss';
import uuid from 'uuid';

class Product extends React.Component{
    
    handleSubmit = event => {
        event.preventDefault();
        const { _id, name, price, discountObj } = this.props;
        const order = {
            id: uuid(),
            productID: _id, 
            name, 
            price: discountObj.length ? discountObj[0].price : price, 
            qty: event.target.querySelector('select[name=quantity]').value
        };
        this.addOrder(order);
    }
    
    addOrder = order => {
        this.props.dispatch(addOrder(order));
    }

    removeOrder = id => {
        this.props.dispatch(removeOrder(id))
    }

    render(){
        const { _id, picture, name, description, price, discountObj } = this.props;
        const order = this.props.orders.find(x => x.productID === _id);
        console.log(order);
        return(
            <div className={s.product}>
                <img className={s.productImg} src={picture} alt="Product"/>
                <div className={s.productInfo}>
                    <p className={s.productName}>{name}</p>
                    <p className={s.productDesc}>{description}</p>
                    <div className={s.productOrder}>
                        <span className={s.productPrice}>{discountObj.length ? <s>{'$' + price}</s> : '$' + price}</span>
                        {!!discountObj.length && <span className={s.productPrice} style={{marginLeft: '15px'}} >{'$' + discountObj[0].price}</span>}
                        {!order 
                        ?<form onSubmit={this.handleSubmit} className={s.productForm}>
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
                            <button type='submit' onClick={() => addOrder(_id)} className={s.productButton}>Place Order</button>
                        </form>
                        : <button onClick={() => this.removeOrder(order.id)} className={s.cartButton}>{`In Cart: ${order.qty}`}</button>}
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(state => {
    return{
        orders: state.orders
    }
})(Product);