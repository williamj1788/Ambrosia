import React from 'react';
import s from '../../styles/HotDeals.module.scss';
import { addOrder, removeOrder } from '../../redux/action';
import uuid from 'uuid';
import { connect } from 'react-redux';
class Deal extends React.Component{
    
    handleClick = () => {
        const { _id, name, price, discountObj } = this.props;
        const order = {
            id: uuid(),
            productID: _id, 
            name, 
            price: discountObj.length ? discountObj[0].price : price, 
            qty: 1
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
        const { _id, name, picture, description, price, discountObj } = this.props;
        const order = this.props.orders.find(x => x.productID === _id);
        return(
            <div className={s.deal}>
                <img className={s.dealImg} src={picture} alt="product"/>
                <div className={s.dealInfo}>
                    <span className={s.dealTitle}>{name}</span>
                    <p className={s.dealDesc}>{description}</p>
                    <div className={s.dealPriceContainer}>
                        <span className={s.dealPrice}>{getDiscountPercent(discountObj[0].price, price) + '% off'}</span>
                        <span className={s.dealPrice}><s>{'$' + price.toFixed(2)}</s></span>
                        <span className={s.dealPrice}>{'$' + discountObj[0].price.toFixed(2)}</span>
                        {order 
                        ? <button onClick={() => this.removeOrder(order.id)} className={s.cartButton}>{`In Cart: ${order.qty}`}</button>
                        : <button onClick={this.handleClick} className={s.dealButton}>Place Order</button>}
                    </div>
                </div>
            </div>
        )
    }
}

function roundNumber(num, target = 2){
    return Math.round(num * Math.pow(10, target)) / 100
};

function getDiscountPercent(discount, price) {
   return Math.round((1 - roundNumber(discount / price)) * 100)
}

export default connect(state => {
    return{
        orders: state.orders
    }
})(Deal);
