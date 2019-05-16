import React from 'react';
import s from '../styles/Products.module.scss';
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import moment from 'moment';

import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";

class DiscountModal extends React.Component{

    state = {
        date: new Date().setTime(new Date().getTime() + (1000 * 60 * 60 * 24)),
        error: null,
    }

    handleChange = (date) => {
        this.setState({
          date,
        });
      }
    
    handleSubmit = event => {
        event.preventDefault();
        if(this.isValidForm()){
            
        }
        
    }

    isValidForm = () => {
        const price = document.querySelector('input[name = newPrice]').value;
        return price > this.props.product.price;
    }

    addDiscount = () => {
        return new Promise((resolve, reject) => {
            fetch(`/api/admin/products/discount/create/${this.props.product._id}`, {
                method: 'POST',
                body: this.getFormData()
            })
            .then(res => res.json())
            .then(res => {
                if(res.message){
                    reject(res)
                }else{
                    resolve(res)
                }
            })
            .catch(err => reject(err));
        })
    }

    getFormData = () => {
        return new FormData(document.getElementById('discount-form'));
    }
    
    render(){
        const { product } = this.props;
        return(
            <div className={s.dark}>
                <div className={s.discountModal}>
                    <div className={s.header} style={{backgroundColor: '#0033ff'}} >
                        <div className={s.trash} onClick={this.props.show}>
                            <FaTrashAlt size="1.75em" />
                        </div>
                        <span style={{color: 'white'}} >Add A Discount</span>
                        <div className={s.close} onClick={this.props.show}>
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
                            <input className={s.discountRignt} type="number" name="newPrice" />
                        </div>
                        <div className={s.discountFormRecord}>
                            <label className={s.discountLabel} htmlFor="expireAt">Expires in:</label>
                            <div className={s.discountRignt}>
                                <DatePicker
                                className={s.datePicker}
                                selected={this.state.date}
                                onChange={this.handleChange}
                                minDate={new Date().setTime(new Date().getTime() + (1000 * 60 * 60 * 24))}
                                />
                            </div>
                        </div>
                        <button className={s.discountButton} type='submit'>Add</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}

export default DiscountModal;