/*
 *
 * Sale reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';
import {
  SALE_LOADED,
} from '../SalesList/actions';

const initialState = fromJS({});

function saleReducer(state = initialState, action) {
  switch (action.type) {
    case SALE_LOADED:
      return state.set('selectedSale', false)
        .set('selectedSale', action.selectedSale);
    default:
      return state;
  }
}

export default saleReducer;
