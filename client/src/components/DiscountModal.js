import React from 'react';
import s from '../styles/Products.module.scss';
import { FaTimes } from "react-icons/fa";

class DiscountModal extends React.Component{
    render(){
        return(
            <div className={s.dark}>
                <div className={s.discountModal}>
                    <div className={s.header} style={{backgroundColor: '#0033ff'}} >
                        <span style={{color: 'white'}} >Add A Discount</span>
                        <div className={s.close} onClick={this.props.show}>
                            <FaTimes size="1.75em" />
                        </div>
                    </div>
                    <p className={s.discountTitle}>Product - Pizza</p>
                    <div className={s.discountFormRecord}>
                        <p className={s.discountLabel}>Old Price:</p>
                        <p className={s.discountRignt}>12.99</p>
                    </div>
                    <form >
                        <div className={s.discountFormRecord}>
                            <label className={s.discountLabel} htmlFor="newPrice">New Price:</label>
                            <input className={s.discountRignt} type="number" name="newPrice" />
                        </div>
                        <div className={s.discountFormRecord}>
                            <label className={s.discountLabel} htmlFor="newPrice">Expire in:</label>
                            <select className={s.discountRignt} name="expireIn">
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