import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderDetail from '../../components/Order/OrderDetail/OrderDetail';
import classes from './Checkout.css';

import * as actions from '../../store/actions/order';

class Checkout extends Component {
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/order-detail');
    }

    render() {
        let summary = <Redirect to="/" />;
        if(this.props.ingredients){
            let redirectAfterOrderComplete = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div className={classes.Checkout}>
                    {redirectAfterOrderComplete}
                    <div>
                        <CheckoutSummary 
                            ingredient={this.props.ingredients}
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler} />
                    </div>
                    <div>
                        <Route path={this.props.match.path + '/order-detail'} render={(props) => (
                            <OrderDetail 
                                ingredient={this.props.ingredients} 
                            price={this.props.price} {...props} />)} />
                    </div>
                </div>
            );
        }
        return summary;
    }

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.initPurchase())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);