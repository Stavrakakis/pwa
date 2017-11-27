
import { fromJS } from 'immutable';
import saleReducer from '../reducer';

describe('saleReducer', () => {
  it('returns the initial state', () => {
    expect(saleReducer(undefined, {})).toEqual(fromJS({}));
  });
});
