import React from 'react';

import Navbar from './Navbar';
import ReviewSection from './ReviewSection';
import Footer from './Footer';
import HotDeals from './HotDeals';

import s from '../styles/Home.module.scss';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PizzaIcon from '../images/Pizza_icon_white.png';
import MoneyIcon from '../images/Money_icon.png';
import TruckIcon from '../images/truck_icon.png';
import ArrowDown from '../images/arrow-down.png';


export class Home extends React.Component{
    
    state = {
        redirectToMenu: false
    }

    setRedirect = () => {
        this.setState({
            redirectToMenu: true,
        });
    }
    
    render(){
        if(this.state.redirectToMenu){ 
            return <Redirect to='/menu' />
        }
        return(
            <div>
                <Hero redirect={this.setRedirect}/>
                <About />
                <HotDeals />
                <ReviewSection />
                <Footer />
                <Copyright />
            </div>
        )
    }
}

const Hero = ({ redirect }) => {
    return(
        <section className={s.hero}>
            <div className={s.darken}>
                <Navbar />
                <p className={s.heroTitle}>Best Pizza in Town</p>
                <button onClick={redirect} className={s.heroButton}>View Menu</button>
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
                desc={'We go through multiple checks of each ingredient to ensure that our pizza is top quality'}
                />
                <Unit 
                img={MoneyIcon}
                title={'Low Prices'}
                desc={'We work with our local farmers to provide affordable and quality ingredients and pass the savings to our customers'}
                />
                <Unit 
                img={TruckIcon}
                title={'Fast Service'}
                desc={'With active drivers that are always on standby, we guarantee a delivery in under 30 mins or the order is free'}
                />
            </div>
        </section>
    )
}

const AboutTitle = () => {
    return(
        <div>
            <h2 className={s.aboutTitle}>About Us</h2>
            <p className={s.aboutDesc}>We are committed to providing our customers with excellent service that makes us deserving of being the best pizzeria in town</p> 
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

const Copyright = () => {
    return(
        <div className={s.copyright}>
            <p className={s.copyrightText}>Copyright ©2019 All rights reserved</p>
        </div>
    )
}

export default connect()(Home);