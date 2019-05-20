import { SET_PAGE, SET_USER, CLEAR_USER, SET_PRODUCTS, ADD_PRODUCT, EDIT_PRODUCT, REMOVE_PRODUCT, EDIT_ORDER, REMOVE_ORDER } from './actionTypes';
import uuid from 'uuid';

const initialState = {
    page: null,
    user: null,
    products: null,
    orders: [
        {
            id: uuid(),
            name: 'pizza1',
            price: 32.99,
            qty: 1
        },
        {
            id: uuid(),
            name: 'pizza2',
            price: 20.99,
            qty: 3
        },
        {
            id: uuid(),
            name: 'pizza3',
            price: 6.99,
            qty: 1
        },
        {
            id: uuid(),
            name: 'pizza4',
            price: 7.99,
            qty: 4
        },
        {
            id: uuid(),
            name: 'pizza5',
            price: 9.99,
            qty: 2
        },
        {
            id: uuid(),
            name: 'pizza6',
            price: 22.99,
            qty: 1
        },
        {
            id: uuid(),
            name: 'pizza7',
            price: 10.99,
            qty: 3
        },
        {
            id: uuid(),
            name: 'pizza1',
            price: 32.99,
            qty: 1
        },
        {
            id: uuid(),
            name: 'pizza2',
            price: 20.99,
            qty: 3
        },
        {
            id: uuid(),
            name: 'pizza3',
            price: 6.99,
            qty: 1
        },
        {
            id: uuid(),
            name: 'pizza4',
            price: 7.99,
            qty: 4
        },
        {
            id: uuid(),
            name: 'pizza5',
            price: 9.99,
            qty: 2
        },
        {
            id: uuid(),
            name: 'pizza6',
            price: 22.99,
            qty: 1
        },
        {
            id: uuid(),
            name: 'pizza7',
            price: 10.99,
            qty: 3
        },
        {
            id: uuid(),
            name: 'pizza1',
            price: 32.99,
            qty: 1
        },
        {
            id: uuid(),
            name: 'pizza2',
            price: 20.99,
            qty: 3
        },
        {
            id: uuid(),
            name: 'pizza3',
            price: 6.99,
            qty: 1
        },
        {
            id: uuid(),
            name: 'pizza4',
            price: 7.99,
            qty: 4
        },
        {
            id: uuid(),
            name: 'pizza5',
            price: 9.99,
            qty: 2
        },
        {
            id: uuid(),
            name: 'pizza6',
            price: 22.99,
            qty: 1
        },
        {
            id: uuid(),
            name: 'pizza7',
            price: 10.99,
            qty: 3
        }
    ],
};

function reducer(state = initialState, action){
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                page: action.payload,
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }
        case ADD_PRODUCT:{
            const products = state.products.slice();
            products.push(action.payload);
            return{
                ...state,
                products,
            }
        }
        case EDIT_PRODUCT:{
            const products = state.products.slice();
            const index = products.findIndex(x => x._id === action.payload._id);
            products[index] = action.payload;
            return{
                ...state,
                products,
            }
        }
        case EDIT_ORDER :{
            const orders = state.orders.slice();
            const index = orders.findIndex(x => x.id === action.payload.id);
            orders[index] = action.payload;
            return{
                ...state,
                orders,
            }
        }
        case REMOVE_PRODUCT:{
            const products = state.products.slice();
            const index = products.findIndex(x => x._id === action.payload);
            products.splice(index, 1);
            return{
                ...state,
                products,
            }
        }
        case REMOVE_ORDER:{
            const orders = state.orders.slice();
            const index = orders.findIndex(x => x._id === action.payload);
            orders.splice(index,1);
            return{
                ...state,
                orders,
            }
        }
        case CLEAR_USER:
            return {
                ...state,
                user: null,
            }
        default:
            return state;
    }
}

export default reducer;