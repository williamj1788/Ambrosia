import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { setProducts, removeProduct } from '../redux/action';
import { Redirect } from 'react-router-dom';
import s from '../styles/Products.module.scss';
import { FaTrashAlt } from "react-icons/fa";
import ProductModal from './ProductModal';
import DiscountModal from './DiscountModal';

class Products extends React.Component{
    
    state = {
        loading: !this.props.products,
        redirect: false,
        showProductModal: false,
        showDiscountModal: false,
        ProductModalEdit: false,
        editProduct: null,
        discountProduct: null,
        searchText: '',
    }
    
    componentDidMount(){
        if(!this.isAdmin()){
            this.setRedirect(true);
        }else if(!this.props.products){
            this.loadProducts();
        }
    }

    loadProducts = () => {
        this.fetchProducts()
        .then(products => this.props.dispatch(setProducts(products)))
        .then(() => this.setLoading(false))
    }

    fetchProducts = () => {
       return fetch('/api/admin/products')
        .then(res => res.json())
        .catch(console.log);
    }

    setLoading = value => {
        this.setState({loading: value});
    }

    setRedirect = value => {
        this.setState({redirect: value});
    }

    isAdmin = () => {
        return this.props.user && this.props.user.admin;
    }

    toggleProductModal = () => {
        this.setState({
            showProductModal: !this.state.showProductModal,
            ProductModalEdit: false,
        })
    }

    handleChange = event => {
        this.setState({searchText: event.target.value});
    }
    showEdit = id => {
        this.setState({
            showProductModal: true,
            ProductModalEdit: true,
            editProduct: this.props.products.find(x => x._id === id)
        });
    }

    toggleDiscountModal = id => {
        this.state.showDiscountModal ? this.closeDiscountModal() : this.openDiscountModal(id);
    }

    openDiscountModal = id => {
        this.setState({
            showDiscountModal: true,
            discountProduct: this.props.products.find(x => x._id === id)
        });
    }

    closeDiscountModal = () => {
        this.setState({
            showDiscountModal: false,
            discountProduct: null,
        });
    }

    deleteProduct = (event, id) => {
        event.stopPropagation();
        fetch(`/api/admin/products/delete/${id}`, { method: 'DELETE' })
        .then(() => this.props.dispatch(removeProduct(id)));
    };
    
    render(){
        const { 
            loading, 
            redirect, 
            showProductModal, 
            ProductModalEdit, 
            editProduct,
            discountProduct, 
            searchText,
            showDiscountModal
        } = this.state

        if(redirect){
            return <Redirect to='/' />
        }
        if(loading){
            return <div>Loading...</div>
        }
        return(
            <div>
                <Navbar />
                <div className={s.content}>
                    <h1 className={s.title}>Products</h1>
                    <button onClick={this.toggleProductModal} className={s.createButton} type="button">Create A Product</button>
                    <input onChange={this.handleChange} className={s.searchBar} type="search" placeholder="Search for a product" />
                    <ProductContainer 
                    products={this.props.products} 
                    search={searchText} 
                    showEdit={this.showEdit}
                    deleteProduct={this.deleteProduct}
                    toggleDiscount={this.toggleDiscountModal}
                    />
                    {showProductModal && <ProductModal show={this.toggleProductModal} product={ProductModalEdit ? editProduct: undefined} edit={ProductModalEdit} />}
                    {showDiscountModal && <DiscountModal show={this.toggleDiscountModal} product={discountProduct} />}
                </div>
            </div>
        )
    }
}

function priority(type) {
    switch (type) {
        case 'pizza':
            return 5
        case 'pasta':
            return 4
        case 'bread':
            return 3
        case 'dessert':
            return 2
        case 'drink':
            return 1
        default:
            return 0
    }
}

const ProductContainer = ({ products, search, showEdit, deleteProduct, toggleDiscount }) => {
    if(search){
        products = products.filter(product => {
            let regex = new RegExp(`^${search}`, 'gi');
            return regex.test(product.name) || regex.test(product.type);
        });
    }

    products = products.sort((a, b) => {
        if(a.type === b.type){
            return 0;
        }else if(priority(a.type) > priority(b.type)){
            return -1
        }else{
            return 1
        }
    });
    
    products = products.map((product, index) => {
        return (
            <Product 
            key={index}
            {...product} 
            showEdit={showEdit} 
            deleteProduct={deleteProduct}
            toggleDiscount={toggleDiscount} />
        )
    });
    return(
        <div className={s.productContainer}>
            {products}
        </div>
    )
}

const Product = ({name, type, _id, discountObj , price, showEdit, deleteProduct, toggleDiscount}) => {

    return(
        <div>
            <button onClick={() => showEdit(_id)} className={s.product} type="button">
                <div onClick={event => deleteProduct(event, _id)} className={s.icon}>
                    <FaTrashAlt 
                    size="1.5em"
                    />
                </div>
                <span>{`${name} - ${type}`}</span>
            </button>
            <DealButton onClick={() => toggleDiscount(_id)} discountObj={discountObj} price={price} />
        </div>
    )
}

function roundNumber(num, target = 2){
    return Math.round(num * Math.pow(10, target)) / 100
};

function getDiscountPercent(discount, price) {
   return Math.round((1 - roundNumber(discount / price)) * 100)
}

function daysBetweenDates(day1, day2) {
    return Math.round(((new Date(day1).getTime() - day2.getTime()) / (1000 * 60 * 60 * 24)) * 100) / 100
}

const DealButton = ({ onClick, discountObj, price }) => {
    let daysTilExpire;
    let dicountPercent;
    if(discountObj && discountObj.length){
        daysTilExpire = daysBetweenDates(discountObj[0].expiresAt, new Date());
        dicountPercent = getDiscountPercent(discountObj[0].price, price);
    }
    return(
        <button className={s.deal} onClick={onClick}>
            <span>{discountObj && discountObj.length ? `${dicountPercent}% off for ${daysTilExpire} more days` :'Click to add Discount'}</span>
        </button>
    )
}

export default connect(state => {
    return {
        user: state.user,
        products: state.products,
    }
})(Products);