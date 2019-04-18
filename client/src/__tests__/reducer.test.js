import reducer from '../redux/reducer';
import * as types from '../redux/actionTypes';

const initalState = {
    page: null,
}

test('should handle SET_PAGE', () => {
    const action = {
        type: types.SET_PAGE,
        payload: 'Home'
    }
    const expectedState = {
        page: 'Home'
    }
    expect(reducer(initalState, action)).toEqual(expectedState);
});