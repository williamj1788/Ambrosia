import React from 'react';
import Navbar from './Navbar';
import s from '../styles/Home.module.scss';

import { connect } from 'react-redux';

import { setPage } from '../redux/action';

class Home extends React.Component{
    componentWillMount(){
        this.props.dispatch(setPage('Home'));
    }
    
    render(){
        return(
            <div>
                <Hero />
                <div>
                    <h2>About Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                    <div>
                        <div>
                            <img src="" alt=""/>
                            <span>Great Pizza</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                        </div>
                        <div>
                            <img src="" alt=""/>
                            <span>Great Pizza</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                        </div>
                        <div>
                            <img src="" alt=""/>
                            <span>Great Pizza</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const Hero = () => {
    return(
        <div className={s.hero}>
            <div className={s.darken}>
                <Navbar />
                <p className={s.heroTitle}>Best Pizza in Town</p>
                <button className={s.heroButton}>View Menu</button>
            </div>
        </div>
    )
}

Home = connect()(Home);
export default Home;