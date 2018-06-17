import { LOGGED_IN, LOGGED_OUT } from '../constants/auth'

const defaultState = {
    isLoggedIn : false,
    payload : {}
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
      case LOGGED_IN:
        return Object.assign({}, state, {
            isLoggedIn: true,
            payload: action.data
        });
      case LOGGED_OUT:
        return Object.assign({}, state, {
            isLoggedIn: false,
            payload : {}
        });
      default:
        return state;
    }
}
