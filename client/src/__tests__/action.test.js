import * as actions from '../redux/action';
import * as Types from '../redux/actionTypes';

test('Handle setPage', () => {
    const payload = 'Home';
    const expectedAction = {
        type: Types.SET_PAGE,
        payload: 'Home',
    }
    expect(actions.setPage(payload)).toEqual(expectedAction);
});