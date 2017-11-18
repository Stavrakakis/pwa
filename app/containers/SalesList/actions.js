/*
 *
 * SalesList actions
 *
 */

import fetch from 'isomorphic-fetch';

import {
  DEFAULT_ACTION,
} from './constants';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const REQUEST_SALES = 'REQUEST_SALES';
export const RECEIVE_SALES = 'RECEIVE_SALES';

function requestSales() {
  return {
    type: REQUEST_SALES,
  }
}

function receiveSales(json) {
  return {
    type: RECEIVE_SALES,
    sales: json.sales,
  }
}

function fetchSales() {
  return dispatch => {
    dispatch(requestSales())
    return fetch("https://localhost:8443/flashsales/v1/sales")
      .then(response => response.json())
      .then(json => dispatch(receiveSales(json)));
  }
}

export function fetchSalesIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(fetchSales());
  }
}