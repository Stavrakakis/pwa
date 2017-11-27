import { createSelector } from 'reselect';

/**
 * Direct selector to the sale state domain
 */
const selectSaleDomain = (state) => state.get('sale');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Sale
 */

const makeSelectSale = () => createSelector(
  selectSaleDomain,
  (substate) => substate.toJS()
);

export default makeSelectSale;
export {
  selectSaleDomain,
};
