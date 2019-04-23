import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import s from '../styles/Menu.module.scss';

export class Menu extends React.Component{
    
    state = {
        redirect: false,
        productTarget: null,
    }

    redirectToProduct = productTarget => {
        this.setState({
            redirect: true,
            productTarget,
        });
    }
    
    render(){
        const { redirect, productTarget } = this.state;
        if(redirect){ return <Redirect to={productTarget} /> }

        return(
            <div>
                <Navbar />
                <div className={s.content}>
                    <h1 className={s.title}>Menu</h1>
                    <TabContainer>
                        <Tab product='pizza'>Pizza</Tab>
                        <Tab product='pasta'>Pasta</Tab>
                        <Tab product='bread'>Bread</Tab>
                        <Tab product='dessert'>Desserts</Tab>
                        <Tab product='drink'>Drinks</Tab>
                    </TabContainer>
                </div>
            </div>
        )
    }
}

const TabContainer = ({ redirect, productPage, children }) => {
    children = React.Children.map(children, child => {
        return React.cloneElement(child, {
            redirect,
            productPage,

        });
    }); 
    
    return(
        <div className={s.tabContainer}>
            {children}
        </div>
    )
}

const Tab = ({ productPage, redirect, product, children }) => {
    return(
        <button onClick={productPage !== product ? redirect : undefined} className={`${s.tab} ${productPage !== product ? s.active : ''}`}>{children}</button>
    )
} 

export default connect()(Menu);