import React from 'react';

import { connect } from 'react-redux';

import Navbar from './shared/Navbar';
import Content from './shared/Content';
import Title from './shared/Title';

import s from '../styles/UserOrder.module.scss';

class UserOrder extends React.Component{
    
    render(){
        return(
            <div>
                <Navbar />
                <Content>
                    <Title>Past Orders</Title>
                    <OrderHistory orders={this.props.user.orders} />
                </Content>
            </div>
        )
    }
}

const OrderHistory = ({ orders }) => {
    
    orders = orders.sort((a, b) => {
        const dateA = new Date(a).getTime();
        const dateB = new Date(b).getTime();
        if(dateA === dateB){
            return 0;
        }else if(dateA > dateB){
            return 0;
        }else{
            return -1;
        }

    });

    orders = orders.map(order => {
        return <Order {...order} />
    });

    return(
        <div className={s.orderContainer}>
            {orders}
        </div>
    )
}

const Order = ({ createAt, address, productList }) => {

    let date = new Date(createAt);
    date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    let total = productList.reduce((acc, product) => {
        return acc +  product.price * product.qty;
    },0);

    total *= 1.06;
    total += 3;

    productList = productList.map(product => {
        return(
            <tr>
                <td>{product.name}</td>
                <td>{product.qty}</td>
                <td>{`$${product.price.toFixed(2)}`}</td>
            </tr>
        )
    });

    return(
        <div className={s.order}>
            <p className={s.date}>{date}</p>
            <div className={s.deliver}>
                <p>Delivered to:</p>
                <p style={{marginLeft: 10}}>{address}</p>
            </div>
            <table className={s.table}>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {productList}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2} style={{textAlign: 'initial'}}>
                            <p style={{marginLeft: 10}}>Total (fees and tax included):</p>
                        </td>
                        <td>
                            <p>{`$${total.toFixed(2)}`}</p>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default connect(state => {
    return{
        user: state.user
    }
})(UserOrder);