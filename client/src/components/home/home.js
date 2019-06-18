import React from 'react';

import Navbar from '../shared/Navbar';
import ReviewSection from './ReviewSection';
import Footer from './Footer';
import HotDeals from './HotDeals';

import s from '../../styles/Home.module.scss';

import { connect } from 'react-redux';
import { setProducts } from '../../redux/action';
import { Redirect } from 'react-router-dom';


import PizzaIcon from '../../images/Pizza_icon_white.png';
import MoneyIcon from '../../images/Money_icon.png';
import TruckIcon from '../../images/truck_icon.png';
import ArrowDown from '../../images/arrow-down.png';


export class Home extends React.Component{
    
    state = {
        redirectToMenu: false,
        loading: !this.props.products
    }

    componentDidMount(){
        if(!this.props.products){
            this.loadProducts();
        }
    }

    loadProducts = () => {
        this.fetchProducts()
        .then(products => this.props.dispatch(setProducts(products)))
        .then(() => this.setState({loading: false}))
    }

    fetchProducts = () => {
       return fetch('/api/admin/products')
        .then(res => res.json())
        .catch(console.log);
    }

    setRedirect = () => {
        this.setState({
            redirectToMenu: true,
        });
    }
    render(){
        if(this.state.redirectToMenu){ 
            return <Redirect push to='/menu' />
        }
        if(this.state.loading){
            return <div className='loading'>Loading...</div>
        }
        return(
            <main>
                <Hero redirect={this.setRedirect}/>
                <About />
                <HotDeals />
                <ReviewSection />
                <Footer />
                <Copyright />
            </main>
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
                <Perk 
                img={PizzaIcon}
                title={'Great Pizza'}
                desc={'We go through multiple checks of each ingredient to ensure that our pizza is top quality'}
                />
                <Perk 
                img={MoneyIcon}
                title={'Low Prices'}
                desc={'We work with our local farmers to provide affordable and quality ingredients and pass the savings to our customers'}
                />
                <Perk 
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

export const Perk = ({ img, title, desc }) => {
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

export default connect(state => {
    return {
        products: state.products
    }
})(Home);