import React from 'react';
import s from '../styles/Products.module.scss';
import { connect } from 'react-redux';
import { addProduct, editProduct } from '../redux/action';
import { FaTimes } from "react-icons/fa";

class ProductModal extends React.Component{
    
    state = {
        filename: 'Upload image',
    }

    clickFileInput = () =>{
        document.querySelector('input[name=picture]').click();
    }
    handleFileChange = event => {
        this.setState({
            filename: event.target.value.split('\\').pop()
        })
    }

    createProduct = () => {
        const form = document.getElementById('product-form');
        const formData = new FormData(form);
        
        fetch('/api/admin/products/create', {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(res => this.props.dispatch(addProduct(res)))
        .then(this.props.show);
    }

    editProduct =  id => {
        const form = document.getElementById('product-form');
        const formData = new FormData(form);
        fetch(`/api/admin/products/edit/${id}`, {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res
        })
        .then(res => this.props.dispatch(editProduct(res)))
        .then(this.props.show);
    }
    
    render(){
        const { filename } = this.state;
        const { product, edit } = this.props;
        return(
            <div className={s.dark}>
                <div className={s.productModel} >  
                    <div className={s.header}>
                        <span>{edit ? product.name : 'Create A Product'}</span>
                        <div className={s.close} onClick={this.props.show}>
                            <FaTimes size="1.75em" />
                        </div>
                    </div>
                    <form id="product-form" onSubmit={this.handleSubmit} className={s.form}>
                        <div className={s.formRecord}>
                            <label className={s.label} htmlFor="type">Type:</label>
                            <select defaultValue={product && product.type} className={s.input} name="type">
                                <option value="pizza">Pizza</option>
                                <option value="pasta">Pasta</option>
                                <option value="bread">Bread</option>
                                <option value="desserts">Desserts</option>
                                <option value="drink">Drink</option>
                            </select>
                        </div>
                        <div className={s.formRecord}>
                            <label className={s.label} htmlFor="picture">Image:</label>
                            <input onChange={this.handleFileChange} className={s.file} type="file" name="picture" required />
                            <button onClick={this.clickFileInput} type='button' className={s.fileButton}>{filename}</button>
                        </div>
                        <div className={s.formRecord}>
                            <label className={s.label} htmlFor="name">Name:</label>
                            <input defaultValue={product && product.name} className={s.input} type="text" name="name" required />
                        </div>
                        <div className={s.formRecord}>
                            <label className={s.label} htmlFor="description">Desc:</label>
                            <textarea defaultValue={product && product.description} className={s.input} style={{height: '200px', resize: 'none'}} name="description" cols="30" rows="10" placeholder="30 word limit" maxLength="200" required></textarea>
                        </div>
                        <div className={s.formRecord}>
                            <label className={s.label} htmlFor="price">Price:</label>
                            <input defaultValue={product && product.price} className={s.input} minLength="0" step='0.01' type="number" name="price" required />
                        </div>
                        <div className={s.formRecord}>
                            {edit 
                            ? <button onClick={() => this.editProduct(product._id)} className={s.submitButton} type="button">Edit</button>
                            : <button onClick={this.createProduct} className={s.submitButton} type="button">Create</button>}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect()(ProductModal);