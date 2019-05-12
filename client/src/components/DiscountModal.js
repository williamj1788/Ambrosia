import React from 'react';
import s from '../styles/Products.module.scss';
import { FaTimes } from "react-icons/fa";

class DiscountModal extends React.Component{
    render(){
        return(
            <div className={s.dark}>
                <div className={s.discountModal}>
                    <div className={s.header} style={{backgroundColor: '#0033ff'}} >
                        <span style={{color: 'white'}} >Add a Discount</span>
                        <div className={s.close} onClick={this.props.show}>
                            <FaTimes size="1.75em" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DiscountModal;