
import { fromJS } from 'immutable';

import {
  REQUEST_SALES,
  RECEIVE_SALES,
} from './actions';

const initialState = fromJS({
  isFetching: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SALES:
      return state.set('isFetching', true);
    case RECEIVE_SALES:
      return state.set('isFetching', false)
        .set('sales', action.sales);
    default:
      return state;
  }
}

export default reducer;
