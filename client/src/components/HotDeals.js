import React from 'react';
import s from '../styles/HotDeals.module.scss';
import PizzaIcon from '../images/Pizza_icon_white.png';

class HotDeals extends React.Component{
    render(){
        return(
            <section className={s.hotDeals}>
                <h3 className={s.hotDealsTitle}>Hot Deals</h3>
                <DealContainer />
            </section>
        )
    }
}

const DealContainer = () => {
    return(
        <div className={s.dealsContainer}>
            <Deal />
            <Deal />
            <Deal />
            <Deal />
            <Deal />
            <Deal />
            <Deal />
            <Deal />
            <Deal />
            <Deal />
        </div>
    )
}

const Deal = () => {
    return(
        <div className={s.deal}>
            <img className={s.dealImg} src={PizzaIcon} alt=""/>
            <div className={s.dealInfo}>
                <span className={s.dealTitle}>Pizza Title</span>
                <p className={s.dealDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                <div className={s.dealPriceContainer}>
                    <span className={s.dealPrice}><s>10.99</s></span>
                    <span className={s.dealPrice}>7.99</span>
                    <button className={s.dealButton}>Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default HotDeals;