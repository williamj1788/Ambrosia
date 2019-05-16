import React from 'react';
import s from '../styles/Products.module.scss';
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import { connect } from 'react-redux'
import { editProduct } from '../redux/action';

import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";

class DiscountModal extends React.Component{

    state = {
        date: (this.props.product.discountObj[0] && new Date(this.props.product.discountObj[0].expriresAt)) || new Date().setTime(new Date().getTime() + (1000 * 60 * 60 * 24)),
        error: null,
    }

    handleChange = (date) => {
        this.setState({date});
      }
    
    handleSubmit = event => {
        event.preventDefault();
        if(this.isValidForm()){
            if(this.props.product.discountObj.length === 0){
                this.Discount('create')
                .then(product => this.props.dispatch(editProduct(product)))
                .then(this.props.show)
                .catch(console.log);
            }else{
                this.Discount('edit')
                .then(product => this.props.dispatch(editProduct(product)))
                .then(this.props.show)
                .catch(console.log);
            }
        }else{
            this.setState({
                error: 'new price must be lower than old price'
            });
        }
        
    }

    isValidForm = () => {
        const price = document.querySelector('input[name = newPrice]').value;
        return price < this.props.product.price;
    }

    Discount = mode => {
        return new Promise((resolve, reject) => {
            fetch(`/api/admin/products/discount/${mode}/${this.props.product._id}`, {
                method: 'POST',
                body: this.getFormData()
            })
            .then(res => res.json())
            .then(res => res.message ? reject(res) : resolve(res))
            .catch(err => reject(err));
        })
    }

    deleteDiscount = () => {
        fetch(`/api/admin/products/discounts/delete/${this.props.product._id}`, {method: 'DELETE'})
        .then(res => res.json())
        .then(product => this.props.dispatch(editProduct(product)))
        .then(this.props.show)
        .catch(console.log);
    }

    getFormData = () => {
        return new FormData(document.getElementById('discount-form'));
    }
    
    render(){
        const { product, show } = this.props;
        const { date, error } = this.state;
        const discount = product.discountObj[0];
        return(
            <div className={s.dark}>
                <div className={s.discountModal}>
                    <div className={s.header} style={{backgroundColor: '#0033ff'}} >
                        {discount && <div className={s.trash} onClick={this.deleteDiscount}>
                            <FaTrashAlt size="1.75em" />
                        </div>}
                        <span style={{color: 'white'}} >Add A Discount</span>
                        <div className={s.close} onClick={show}>
                            <FaTimes size="1.75em" />
                        </div>
                    </div>
                    <p className={s.discountTitle}>{`${product.name} - ${product.type}`}</p>
                    <div className={s.discountFormRecord}>
                        <p className={s.discountLabel}>Old Price:</p>
                        <p className={s.discountRignt}>{product.price}</p>
                    </div>
                    <form onSubmit={this.handleSubmit} id='discount-form' >
                        <div className={s.discountFormRecord}>
                            <label className={s.discountLabel} htmlFor="newPrice">New Price:</label>
                            <input defaultValue={discount ? discount.price : undefined} className={s.discountRignt} type="number" name="newPrice" step='0.01' />
                        </div>
                        <div className={s.discountFormRecord}>
                            <label className={s.discountLabel} htmlFor="expireAt">Expires in:</label>
                            <div className={s.discountRignt}>
                                <DatePicker
                                className={s.datePicker}
                                name='expireAt'
                                selected={date}
                                onChange={this.handleChange}
                                minDate={new Date().setTime(new Date().getTime() + (1000 * 60 * 60 * 24))}
                                />
                            </div>
                        </div>
                        {error &&  <p style={{color: 'red'}} >{error}</p> }
                        <button className={s.discountButton} type='submit'>Add</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}

export default connect()(DiscountModal);