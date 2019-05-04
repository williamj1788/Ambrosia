import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import s from '../styles/Products.module.scss';
import { FaTrashAlt } from "react-icons/fa";

class Products extends React.Component{
    
    state = {
        redirect: false,
        filename: 'Upload image',
    }
    
    componentDidMount(){
        // if(this.props.user){
        //     if(!this.props.user.admin){
        //         this.setState({
        //             redirect: true,
        //         });
        //     }
        // }else{
        //     this.setState({
        //         redirect: true,
        //     });
        // }
    }

    clickFileInput = () =>{
        document.querySelector('input[name=picture]').click();
    }
    handleFileChange = event => {
        this.setState({
            filename: event.target.value.split('\\').pop()
        })
    }
    
    render(){
        const { redirect, filename } = this.state
        if(redirect){
            return <Redirect to='/' />
        }

        return(
            <div>
                <Navbar />
                <h1 className={s.title}>Products</h1>
                <button className={s.createButton} type="button">Create A Product</button>
                <input className={s.searchBar} type="text" placeholder="Search for prouduct" />
                <div className={s.productContainer} >
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                    <Product name="FakePizza" type="pizza" />
                </div>
                <div className={s.dark}>
                    <div className={s.productModel} >  
                        <div className={s.header}>
                            <span>FakePizza</span>
                        </div>
                        <form className={s.form}>
                            <div className={s.formRecord}>
                                <label className={s.label} htmlFor="type">Type:</label>
                                <select className={s.input} name="type">
                                    <option value="pizza">Pizza</option>
                                    <option value="pasta">pasta</option>
                                    <option value="bread">Bread</option>
                                    <option value="desserts">Desserts</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </div>
                            <div className={s.formRecord}>
                                <label className={s.label} htmlFor="picture">Image:</label>
                                <input onChange={this.handleFileChange} className={s.file} type="file" name="picture" required />
                                <button onClick={this.clickFileInput} type='button' className={s.fileButton}>{filename}</button>
                            </div>
                            <div className={s.formRecord}>
                                <label className={s.label} htmlFor="name">Name:</label>
                                <input className={s.input} type="text" name="name" required />
                            </div>
                            <div className={s.formRecord}>
                                <label className={s.label} htmlFor="description">Desc:</label>
                                <textarea className={s.input} style={{height: '200px'}} name="description" cols="30" rows="10" placeholder="30 word limit" required ></textarea>
                            </div>
                            <div className={s.formRecord}>
                                <label className={s.label} htmlFor="price">Price:</label>
                                <input className={s.input} minLength="0" step='0.01' type="number" name="price" required />
                            </div>
                            <div className={s.formRecord}>
                                <button className={s.submitButton} type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const Product = ({name, type}) => {
    return(
        <div>
            <button className={s.product} type="button">
                <div className={s.icon}>
                    <FaTrashAlt 
                    size="1.5em"
                    />
                </div>
                <span>{`${name} - ${type}`}</span>
            </button>
            <button className={s.deal}>
                <span> Click to add Deal</span>
            </button>
        </div>
    )
}

export default connect(state => {
    return {user: state.user}
})(Products);