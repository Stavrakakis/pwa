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

export class SalesList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSalesIfNeeded());
  }

  render() {
    const style = {
      margin: 20,
      width: 600,
      display: 'flex',
    };

    const loading = this.props.isFetching ? <div>Loading...</div> : '';
    
    const saleList = this.props.sales.map((sale) =>
      <Paper key={sale.id} style={style} zDepth={1} >
        <Card>
          <CardMedia>
            <img src={sale.mainPhoto.url} alt="" />
          </CardMedia>
          <CardTitle title={sale.title} subtitle={sale.slug} />
          <CardText>
            {sale.description}
          </CardText>
          <CardActions>
            <FlatButton label="Favourite" />
            <FlatButton label="Book" />
          </CardActions>
        </Card>
      </Paper>
    );

    const containerStyles = {
      display: 'flex',
      'flex-wrap': 'wrap',
      'margin-top': 70
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
  withConnect,
)(SalesList);
