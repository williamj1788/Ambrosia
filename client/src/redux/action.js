import * as TYPE from './actionTypes';

export function setPage(payload){
    return {type: TYPE.SET_PAGE, payload}
}

export function setUser(payload){
    return {type: TYPE.SET_USER, payload}
}
export function clearUser(){
    return {type: TYPE.CLEAR_USER, payload: null}
}
export function setProducts(payload){
    return {type: TYPE.SET_PRODUCTS, payload}
}

export function addProduct(payload){
    return {type: TYPE.ADD_PRODUCT, payload}
};

export function editProduct(payload){
    return {type: TYPE.EDIT_PRODUCT, payload}
}

export function removeProduct(payload){
    return {type: TYPE.REMOVE_PRODUCT, payload}
}

export function editOrder(payload) {
    return {type: TYPE.EDIT_ORDER, payload}
}

export function removeOrder(payload) {
    return {type: TYPE.REMOVE_ORDER, payload}
}