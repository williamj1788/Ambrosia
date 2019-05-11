import React from 'react';
import s from '../styles/Products.module.scss';
import { connect } from 'react-redux';
import { addProduct, editProduct } from '../redux/action';
import { FaTimes } from "react-icons/fa";

class ProductModal extends React.Component{
    
    state = {
        filename: this.props.edit ? 'Replace Image' : 'Upload image',
        fileIsLoaded: false,
        serverError: null
    }

    clickFileInput = () =>{
        document.querySelector('input[name=picture]').click();
    }
    handleFileChange = event => {
        this.setState({
            filename: event.target.value.split('\\').pop(),
            fileIsLoaded: true,
        })
    }

    createProduct = () => {
        if(this.isValidForm()){
            fetch('/api/admin/products/create', {
                method: 'POST',
                body: this.getFormData(),
            })
            .then(res => res.json())
            .then(res => this.props.dispatch(addProduct(res)))
            .then(this.props.show);
        }else{
            this.setState({serverError: 'Please fill in form'});
        }
    }

    editProduct =  id => {
        if(this.isValidForm()){
            fetch(`/api/admin/products/edit/${id}`, {
                method: 'POST',
                body: this.getFormData(),
            })
            .then(res => res.json())
            .then(res => this.props.dispatch(editProduct(res)))
            .then(this.props.show);
        }else{
            this.setState({serverError: 'Please fill in form'});
        }
    }

    isValidForm = () => {
        if(!this.props.edit && !this.state.fileIsLoaded){
            return false;
        }
        const formData = this.getFormData();
        for(let input of formData.entries()){
            if(input[1].length <= 0){
                return false;
            }
        }
        return true;
    }

    getFormData = () => {
        return new FormData(document.getElementById('product-form'));
    }
    
    render(){
        const { filename, serverError } = this.state;
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
                    <form id="product-form" className={s.form}>
                        <div className={s.formRecord}>
                            <label className={s.label} htmlFor="type">Type:</label>
                            <select defaultValue={product && product.type} className={s.input} name="type">
                                <option value="pizza">Pizza</option>
                                <option value="pasta">Pasta</option>
                                <option value="bread">Bread</option>
                                <option value="dessert">Dessert</option>
                                <option value="drink">Drink</option>
                            </select>
                        </div>
                        <div className={s.formRecord}>
                            <label className={s.label} htmlFor="picture">Image:</label>
                            <input onChange={this.handleFileChange} className={s.file} type="file" name="picture" />
                            <button onClick={this.clickFileInput} type='button' className={s.fileButton}>{filename}</button>
                        </div>
                        <div className={s.formRecord}>
                            <label className={s.label} htmlFor="name">Name:</label>
                            <input defaultValue={product && product.name} className={s.input} type="text" name="name" />
                        </div>
                        <div className={s.formRecord}>
                            <label className={s.label} htmlFor="description">Desc:</label>
                            <textarea defaultValue={product && product.description} className={s.input} style={{height: '200px', resize: 'none'}} name="description" cols="30" rows="10" placeholder="30 word limit" />
                        </div>
                        <div className={s.formRecord}>
                            <label className={s.label} htmlFor="price">Price:</label>
                            <input defaultValue={product && product.price} className={s.input} type="number" name="price" />
                        </div>
                        {serverError && <p className={s.serverError}>{serverError}</p> }
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