import type { IsLoggedAction } from '../actions/isLoggedActionCreators';

const reducer = (state = true, action: IsLoggedAction) => {
  switch (action.type) {
    case 'TOGGLE_IS_LOGGED':
      return !state;
    default:
      return state;
  }
};

export default reducer;
