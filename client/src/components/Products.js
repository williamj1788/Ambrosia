import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { setProducts } from '../redux/action';
import { Redirect } from 'react-router-dom';
import s from '../styles/Products.module.scss';
import { FaTrashAlt } from "react-icons/fa";
import ProductModal from './ProductModal';

class Products extends React.Component{
    
    state = {
        loading: true,
        redirect: false,
        showProductModal: false,
        ProductModalEdit: false,
        editProduct: null,
        searchText: '',
    }
    
    componentDidMount(){
        this.fetchProducts();
    }

    fetchProducts = () => {
        fetch('/api/admin/products')
        .then(res => res.json())
        .then(res => this.props.dispatch(setProducts(res)))
        .then(() => {
            this.setState({
                loading: false,
            });
        })
        .catch(error => console.log(error));;
    }

    checkAdmin = () => {
        if(this.props.user){
            if(!this.props.user.admin){
                this.setState({
                    redirect: true,
                });
            }
        }else{
            this.setState({
                redirect: true,
            });
        }
    }

    toggleProductModal = () => {
        this.setState({
            showProductModal: !this.state.showProductModal,
            ProductModalEdit: false,
        })
    }

    handleChange = event => {
        this.setState({
            searchText: event.target.value,
        });
    }
    showEdit = id => {
        const editProduct = this.props.products.find(x => x._id === id);
        this.setState({
            showProductModal: true,
            ProductModalEdit: true,
            editProduct,
        });
    }
    
    render(){
        const { loading, redirect, showProductModal, ProductModalEdit, editProduct, searchText } = this.state
        if(redirect){
            return <Redirect to='/' />
        }
        if(loading){
            return <div>Loading...</div>
        }
        console.log(ProductModalEdit);
        return(
            <div>
                <Navbar />
                <div className={s.content}>
                    <h1 className={s.title}>Products</h1>
                    <button onClick={this.toggleProductModal} className={s.createButton} type="button">Create A Product</button>
                    <input onChange={this.handleChange} className={s.searchBar} type="search" placeholder="Search for prouduct" />
                    <ProductContainer 
                    products={this.props.products} 
                    search={searchText} 
                    showEdit={this.showEdit}
                    />
                    {(showProductModal && !ProductModalEdit) && <ProductModal show={this.toggleProductModal} />}
                    {(showProductModal && ProductModalEdit) && <ProductModal show={this.toggleProductModal} product={editProduct} edit />}
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

const ProductContainer = ({ products, search, showEdit }) => {
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
    
    products = products.map(product => {
        return <Product name={product.name} type={product.type} id={product._id} showEdit={showEdit} />
    });
    return(
        <div className={s.productContainer}>
            {products}
        </div>
    )
}

const Product = ({name, type, id, showEdit}) => {
    return(
        <div>
            <button onClick={() => showEdit(id)} className={s.product} type="button">
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
    return {
        user: state.user,
        products: state.products,
    }
})(Products);