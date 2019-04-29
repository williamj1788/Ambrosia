import { SET_PAGE, SET_USER, CLEAR_USER } from './actionTypes';

export function setPage(payload){
    return {type: SET_PAGE, payload}
}

export function setUser(payload){
    return {type: SET_USER, payload}
}
export function clearUser(payload){
    return {type: CLEAR_USER, payload}
}