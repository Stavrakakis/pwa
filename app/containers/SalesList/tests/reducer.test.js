
import { fromJS } from 'immutable';
import salesListReducer from '../reducer';

describe('salesListReducer', () => {
  it('returns the initial state', () => {
    expect(salesListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
