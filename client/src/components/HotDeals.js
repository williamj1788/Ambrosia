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
    
    if(products.length > 10){
        products.length = 10;
    }

    products = products.sort((a,b) => {
        const DateA =  new Date(a.discountObj[0].expiresAt).getTime();
        const DateB =  new Date(b.discountObj[0].expiresAt).getTime();
        if(DateA === DateB){
            return 0;
        }else if(DateA > DateB){
            return 0;
        }else{
            return -1;
        }
    });
    
    const deals = products.map((product, index) => {
        return <Deal {...product} key={index} />
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
                <div className={s.dealPriceContainer}>
                    <span className={s.dealPrice}>{getDiscountPercent(discountObj[0].price, price) + '% off'}</span>
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

export default connect(state => {
    return {
        products: state.products
    }
})(HotDeals);