import React from 'react';
import s from '../styles/Products.module.scss';
import { connect } from 'react-redux';
import { addProduct } from '../redux/action';
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

    handleSubmit = event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        fetch('/api/admin/products/create', {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(res => this.props.dispatch(addProduct(res)))
        .then(this.props.show);
    }
    
    render(){
        const { filename } = this.state
        return(
            <div className={s.dark}>
                <div className={s.productModel} >  
                    <div className={s.header}>
                        <span>Create A Product</span>
                        <div className={s.close} onClick={this.props.show}>
                            <FaTimes size="1.75em" />
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit} className={s.form}>
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
                            <textarea className={s.input} style={{height: '200px', resize: 'none'}} name="description" cols="30" rows="10" placeholder="30 word limit" maxLength="200" required></textarea>
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
        )
    }
}

export default connect()(ProductModal);