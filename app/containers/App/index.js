import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';

import SalesList from 'containers/SalesList/Loadable';
import Sale from 'containers/Sale/Loadable';
import { push } from 'react-router-redux';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => {
    this.props.dispatch(push('/'));

    this.setState({ open: !this.state.open });
  };

  render() {
    const appBarStyle = {
      position: 'fixed',
      top: '0',
    };

    return (
      <div>
        <AppBar
          title="Secret Escapes"
          style={appBarStyle}
          onClick={this.handleToggle}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Switch>
          <Route exact path="/" component={SalesList} />
          <Route exact path="/sale/:id" component={Sale} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
