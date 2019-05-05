import { SET_PAGE, SET_USER, CLEAR_USER, SET_PRODUCTS, ADD_PRODUCT } from './actionTypes';


const initialState = {
    page: null,
    user: null,
    products: null,
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
        case ADD_PRODUCT:
            const products = state.products.slice();
            products.push(action.payload);
            return{
                ...state,
                products,
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