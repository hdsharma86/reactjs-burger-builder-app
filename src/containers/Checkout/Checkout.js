import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderDetail from '../../components/Order/OrderDetail/OrderDetail';
import classes from './Checkout.css';

class Checkout extends Component {

    /*state = {
        ingredients: null,
        price: 0
    };*/

    componentWillMount() {
        /*const ingredients = {};
        let price = 0;
        const searchQuery = new URLSearchParams(this.props.location.search);
        for(let param of searchQuery){
            if(param[0] === 'price'){
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            price: price
        });*/
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/order-detail');
    }

    render() {
        return (
            <div className={classes.Checkout}>
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

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.price
    }
}

export default connect(mapStateToProps)(Checkout);