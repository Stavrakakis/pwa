import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';

import { fetchSalesIfNeeded } from './actions';
import reducer from './reducer';
import messages from './messages';

export class SalesList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSalesIfNeeded());
  }

  render() {
    const loading = this.props.isFetching ? <div>Loading...</div> : '';

    const saleList = this.props.sales.map((sale) => <div><div>{sale.title}</div><img alt={sale.slug} src={sale.mainPhoto.url}></img></div>);

    return (
      <div>
        <FormattedMessage {...messages.header} />
        {loading}
        {saleList}
      </div>
    );
  }
}

SalesList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  sales: PropTypes.array,
};

const mapStateToProps = (state) => {
  const s = state.toJS().saleslist;
  return { isFetching: s.isFetching, sales: s.sales || [] };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'saleslist', reducer });

export default compose(
  withReducer,
  withConnect,
)(SalesList);
