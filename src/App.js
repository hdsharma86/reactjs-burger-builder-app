import React, { Component } from 'react';
import { connect } from 'react-redux';   
import { withRouter } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as authActions from './store/actions/auth';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

// Lazy loading using HOC [AsyncComponent]...
const asyncCheckout = AsyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncAuth = AsyncComponent(() => import('./containers/Auth/Auth'));
const asyncOrder = AsyncComponent(() => import('./containers/Orders/Orders'));

class App extends Component {

  componentDidMount(){
    this.props.onCheckAuthState();
  }


  render() {

    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/sign-in" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuth){
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrder} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState : () => dispatch(authActions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
