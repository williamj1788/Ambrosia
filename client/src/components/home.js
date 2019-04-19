import React from 'react';
import Navbar from './Navbar';
import s from '../styles/Home.module.scss';

import { connect } from 'react-redux';

import { setPage } from '../redux/action';

import PizzaIcon from '../images/Pizza_icon_white.png';
import MoneyIcon from '../images/Money_icon.png';
import TruckIcon from '../images/truck_icon.png';

class Home extends React.Component{
    componentWillMount(){
        this.props.dispatch(setPage('Home'));
    }
    
    render(){
        return(
            <div>
                <Hero />
                <About />
                <div>
                    <h3>Hot Deals</h3>
                    <div>
                        <div>
                            <img src="" alt=""/>
                            <div>
                                <span>Pizza Title</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                <div>
                                    <span><s>10.99</s></span>
                                    <span>7.99</span>
                                    <button>Place Order</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src="" alt=""/>
                            <div>
                                <span>Pizza Title</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                <div>
                                    <span><s>10.99</s></span>
                                    <span>7.99</span>
                                    <button>Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

const Unit = ({ img, title, desc }) => {
    return(
        <div className={s.AboutUnits}>
            <img className={s.aboutUnitImg} src={img} alt="Pizza Icon"/>
            <span className={s.aboutUnitTitle} >{title}</span>
            <p className={s.aboutUnitDesc}>{desc}</p>
        </div>
    )
}

Home = connect()(Home);
export default Home;