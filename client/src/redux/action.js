import { SET_PAGE, SET_USER, CLEAR_USER, SET_PRODUCTS, ADD_PRODUCT, EDIT_PRODUCT, REMOVE_PRODUCT } from './actionTypes';

export function setPage(payload){
    return {type: SET_PAGE, payload}
}

export function setUser(payload){
    return {type: SET_USER, payload}
}
export function clearUser(){
    return {type: CLEAR_USER, payload: null}
}
export function setProducts(payload){
    return {type: SET_PRODUCTS, payload}
}

export function addProduct(payload){
    return {type: ADD_PRODUCT, payload}
};

export function editProduct(payload){
    return {type: EDIT_PRODUCT, payload}
}

export function removeProduct(payload){
    return {type: REMOVE_PRODUCT, payload}
}