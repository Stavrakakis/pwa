/**
*
* SaleCard
*
*/

import React from 'react';

import { push } from 'react-router-redux';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

class SaleCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  handleClick = () => {
    this.props.dispatch(push(`sale/${this.props.sale.id}`));
  }

  render() {
    const style = {
      margin: 20,
      width: 600,
      display: 'flex',
    };

    const sale = this.props.sale;

    return (
      <Paper key={sale.id} style={style} zDepth={1} onClick={this.handleClick} >
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
  }
}

SaleCard.propTypes = {

};

export default SaleCard;
