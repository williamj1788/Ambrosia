import React from 'react';
import Navbar from './Navbar';
import s from '../styles/Home.module.scss';

class Home extends React.Component{
    render(){
        return(
            <div>
                <div className={s.hero}>
                    <div className={s.darken}>
                        <Navbar page={'home'} />
                        <p className={s.heroTitle}>Best Pizza in Town</p>
                        <button className={s.heroButton}>View Menu</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;