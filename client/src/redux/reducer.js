import { SET_PAGE, SET_USER } from './actionTypes';


const initialState = {
    page: null,
    user: null,
};

function reducer(state = initialState, action){
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                page: action.payload,
            }
        case SET_USER:
        console.log(action.payload);
            return {
                ...state,
                user: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;