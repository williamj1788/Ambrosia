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
                <div className={s.hero}>
                    <div className={s.darken}>
                        <Navbar />
                        <p className={s.heroTitle}>Best Pizza in Town</p>
                        <button className={s.heroButton}>View Menu</button>
                    </div>
                </div>
            </div>
        )
    }
}
Home = connect()(Home);
export default Home;