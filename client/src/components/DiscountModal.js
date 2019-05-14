import React from 'react';
import s from '../styles/Products.module.scss';
import { FaTimes, FaTrashAlt } from "react-icons/fa";

class DiscountModal extends React.Component{
    
    handleSubmit = event => {
        event.preventDefault();
        
    }

    addDiscount = () => {

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
                            <select className={s.discountRignt} name="expireAt">
                                <option value="1">1 day</option>
                                <option value="2">2 days</option>
                                <option value="3">3 days</option>
                                <option value="4">4 days</option>
                                <option value="5">5 days</option>
                                <option value="6">6 days</option>
                                <option value="7">7 days</option>
                            </select>
                        </div>
                        <button className={s.discountButton} type='submit'>Add</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}

export default DiscountModal;