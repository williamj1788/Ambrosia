import React from 'react';
import Navbar from './Navbar';
import ReviewSection from './ReviewSection';
import s from '../styles/Home.module.scss';

import { connect } from 'react-redux';

import { setPage } from '../redux/action';

import PizzaIcon from '../images/Pizza_icon_white.png';
import MoneyIcon from '../images/Money_icon.png';
import TruckIcon from '../images/truck_icon.png';
import ArrowDown from '../images/arrow-down.png';


export class Home extends React.Component{
    componentWillMount(){
        this.props.dispatch(setPage('Home'));
    }
    
    render(){
        return(
            <div>
                <Hero />
                <About />
                <HotDeals />
                <ReviewSection />
            </div>
        )
    }
}

const Hero = () => {
    return(
        <section className={s.hero}>
            <div className={s.darken}>
                <Navbar />
                <p className={s.heroTitle}>Best Pizza in Town</p>
                <button className={s.heroButton}>View Menu</button>
                <img className={s.heroArrow} src={ArrowDown} alt="ArrowDown Icon"/>
            </div>
        </section>
    )
}

const About = () => {
    return(
        <section className={s.about}>
            <AboutTitle />
            <div className={s.flexContainer} >
                <Unit 
                img={PizzaIcon}
                title={'Great Pizza'}
                desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}
                />
                <Unit 
                img={MoneyIcon}
                title={'Low Prices'}
                desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}
                />
                <Unit 
                img={TruckIcon}
                title={'Fast Service'}
                desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}
                />
            </div>
        </section>
    )
}

const AboutTitle = () => {
    return(
        <div>
            <h2 className={s.aboutTitle}>About Us</h2>
            <p className={s.aboutDesc} >Lorem ipsum dolor sit amet, consectetur</p> 
        </div>
    )
}

export const Unit = ({ img, title, desc }) => {
    return(
        <div className={s.AboutUnits}>
            <img className={s.aboutUnitImg} src={img} alt="Icon"/>
            <span className={s.aboutUnitTitle} >{title}</span>
            <p className={s.aboutUnitDesc}>{desc}</p>
        </div>
    )
}

const HotDeals = () => {
    return(
        <section className={s.hotDeals}>
            <h3 className={s.hotDealsTitle}>Hot Deals</h3>
            <DealContainer />
        </section>
    )
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


export default connect()(Home);