import React from 'react';
import s from '../styles/HotDeals.module.scss';
import { connect } from 'react-redux';
import Deal from './Deal';

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

export default connect(state => {
    return {
        products: state.products
    }
})(HotDeals);