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
  };
}

function receiveSales(json) {
  return {
    type: RECEIVE_SALES,
    sales: json.sales,
  };
}

function getFromCache(key, getter) {
  if (localStorage.getItem(key) !== null) {
    return new Promise((resolve) => resolve(JSON.parse(localStorage.getItem(key))));
  }

  return getter()
    .then((data) => {
      localStorage.setItem(key, JSON.stringify(data));
      return data;
    });
}

function getSales() {
  return fetch('https://localhost:8443/flashsales/v1/sales')
    .then((response) => response.json());
}
function fetchSales() {
  return (dispatch) => {
    dispatch(requestSales());

    return getFromCache('sales', () => getSales())
      .then((sales) => dispatch(receiveSales(sales)));
  };
}

export function fetchSalesIfNeeded() {
  return (dispatch) => dispatch(fetchSales());
}
