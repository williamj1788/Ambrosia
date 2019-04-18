import { SET_PAGE } from './actionTypes';


const initialState = {
    page: null
};

function reducer(state = initialState, action){
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                page: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;