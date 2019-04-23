import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { setPage } from '../redux/action';
import s from '../styles/Menu.module.scss';

export class Menu extends React.Component{
    
    componentWillMount(){
        this.props.dispatch(setPage(this.props.match.path));
    }
    
    render(){
        return(
            <div>
                <Navbar />
                <div className={s.content}>
                    <h1 className={s.title}>Menu</h1>
                </div>
            </div>
        )
    }
}

export default connect()(Menu);