import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Paper from 'material-ui/Paper';
import { withRouter } from 'react-router-dom';

import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import injectReducer from 'utils/injectReducer';
import makeSelectSale from './selectors';
import reducer from './reducer';
import { fetchSaleData } from '../SalesList/actions';

export class Sale extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSaleData(this.props.match.params.id));
  }

  render() {

    const style = {
      maxWidth: 900,
    };

    if (!this.props.sale.selectedSale) { return <div></div> }

    const sale = this.props.sale.selectedSale;

    return (
      <Paper key={sale.id} style={style} zDepth={1} onClick={this.handleClick} >
        <Card>
          <CardMedia>
            <img src={sale.mainPhoto.url} alt="" />
          </CardMedia>
          <CardTitle title={sale.title} subtitle={sale.slug} />
          <CardText dangerouslySetInnerHTML={{ __html: sale.mainParagraph }}>
          </CardText>
          <CardText dangerouslySetInnerHTML={{ __html: sale.hotelDetails }}>
          </CardText>
        </Card>
      </Paper>
    );
  }
}

Sale.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sale: makeSelectSale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sale', reducer });

export default compose(
  withReducer,
  withRouter,
  withConnect,
)(Sale);
