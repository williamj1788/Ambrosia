import React from 'react';
import s from '../styles/HotDeals.module.scss';
import PizzaIcon from '../images/Pizza_icon_white.png';
import { connect } from 'react-redux';

export class HotDeals extends React.Component{

    findProductsWithDiscounts = () => {
        return this.props.products.filter(product => {
            return product.discountObj.length !== 0;
        })
    }
    
    render(){
        return(
            <section className={s.hotDeals}>
                <h3 className={s.hotDealsTitle}>Hot Deals</h3>
                <DealContainer products={this.findProductsWithDiscounts()} />
            </section>
        )
    }
}

export const DealContainer = ({ products }) => {
    const deals = products.map(product => {
        return <Deal {...product} />
    });


    return(
        <div className={s.dealsContainer}>
            {deals}
        </div>
    )
}


export const Deal = ({ name, picture, description, price, discountObj }) => {
    return(
        <div className={s.deal}>
            <img className={s.dealImg} src={picture} alt="product"/>
            <div className={s.dealInfo}>
                <span className={s.dealTitle}>{name}</span>
                <p className={s.dealDesc}>{description}</p>
                <div className={s.dealStat}>
                    <span className={s.dealPrice}>{getDiscountPercent(discountObj[0].price, price) + '% off'}</span>
                    <span className={s.dealPrice}>{Math.floor(1 + daysBetweenDates(discountObj[0].expiresAt, new Date())) + ' days left'}</span>
                </div>
                <div className={s.dealPriceContainer}>
                    <span className={s.dealPrice}><s>{'$' + price}</s></span>
                    <span className={s.dealPrice}>{'$' + discountObj[0].price}</span>
                    <button className={s.dealButton}>Place Order</button>
                </div>
            </div>
        </div>
    )
}

function roundNumber(num, target = 2){
    return Math.round(num * Math.pow(10, target)) / 100
};

function getDiscountPercent(discount, price) {
   return Math.round((1 - roundNumber(discount / price)) * 100)
}

function daysBetweenDates(day1, day2) {
    console.log(day1, day2)
    console.log(Math.round(((new Date(day1).getTime() - day2.getTime()) / (1000 * 60 * 60 * 24)) * 100) / 100)
    return Math.round(((new Date(day1).getTime() - day2.getTime()) / (1000 * 60 * 60 * 24)) * 100) / 100
}

export default connect(state => {
    return {
        products: state.products
    }
})(HotDeals);