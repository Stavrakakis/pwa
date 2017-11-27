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
  let networkDataReceived = false;



  return caches.match('https://9ullis5n3g.execute-api.us-east-1.amazonaws.com/dev/sales').then(function (response) {
    if (!response) throw Error("No data");
    return response.json();
  });
}

function fetchSales() {
  return (dispatch) => {

    dispatch(requestSales());

    let networkDataReceived = false;

    var networkUpdate = fetch('https://9ullis5n3g.execute-api.us-east-1.amazonaws.com/dev/sales').then(function (response) {
      return response.json();
    }).then(function (sales) {
      networkDataReceived = true;
      dispatch(receiveSales(sales));
    });

    // fetch cached data
    return caches.match('https://9ullis5n3g.execute-api.us-east-1.amazonaws.com/dev/sales').then(function (response) {
      return response.json();
    }).then(function (sales) {
      // don't overwrite newer network data
      if (!networkDataReceived) {
        dispatch(receiveSales(sales));
      }
    }).catch(function () {
      // we didn't get cached data, the network is our last hope:
      return networkUpdate;
    })

    //return getSales().then((sales) => dispatch(receiveSales(sales)));
  };
}

export function fetchSalesIfNeeded() {
  return (dispatch) => dispatch(fetchSales());
}
