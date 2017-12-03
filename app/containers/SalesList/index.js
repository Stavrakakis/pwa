import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';

import { fetchSalesIfNeeded } from './actions';
import reducer from './reducer';

import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';

import SaleCard from '../../components/SaleCard/index'

export class SalesList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchSalesIfNeeded());
  }

  handleClick = () => {
    this.props.dispatch(push('/sale/'));
  }

  render() {

    const progressStyle = {
      top: 300,
      margin: 'auto',
      position: 'relative',
      width: 50,
    };

    const loading = this.props.isFetching ? <div style={progressStyle}><CircularProgress /></div> : '';

    const saleList = this.props.sales.map((sale) =>
      <SaleCard key={sale.id} sale={sale} dispatch={this.props.dispatch} />
    );

    const containerStyles = {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 70,
    };

    return (
      <div>
        {loading}
        <div style={containerStyles}>
          {saleList}
        </div>
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
  withRouter,
  withConnect,
)(SalesList);
