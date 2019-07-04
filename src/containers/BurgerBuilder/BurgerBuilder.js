import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions';

import axios from '../../axios-connector';

class BurgerBuilder extends Component {
    
    /*constructor(props){
        super(props);
        this.state = {...};
    }*/

    state = {
        purchasing:false,
        loading: false,
        error: false
    }

    /*componentDidMount(){
        axios.get('ingredients.json').then((response) => {
            
            const ingredients = response.data;
            this.setState({ingredient: ingredients});

        }).catch((e) => {
            this.setState({
                error: true
            });
        });
    }*/

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key];
        }).reduce((sum, num) => {
            return sum + num;
        });
        return sum > 0;
    }

    pruchasingHandler = () => {
        this.setState({purchasing: true});
    }

    modelCloseHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    orderContinueHandler = () => {

        this.props.history.push('/checkout');
        
        /*this.setState({loading: true});
        const orderDetail = {
            ingredients: this.state.ingredient,
            customer: {
                name: 'Hardev Sharma',
                address: {
                    addressLine1: '#9494 Best Suite',
                    city: 'Rochester',
                    state: 'NY',
                    zip: '254631'
                }
            },
            price: this.state.totalPrice,
            delivery: 'Fastest'
        };

        axios.post('orders.json', orderDetail)
        .then((response) => {
            this.setState({loading: false, purchasing: false});
            console.log(response);
        })
        .catch((e) => {
            this.setState({loading: false, purchasing: false});
            console.log(e)
        });*/

        /*const queryParams = [];
        for(let i in this.props.ings){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]));
        }
        queryParams.push('price='+encodeURIComponent(this.props.price));
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        });*/

    }

    render() {

        let disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }        

        let burger = this.state.error ? <div>Ingredient can't be loaded!</div> : <Spinner />;
        let orderSummary = null;
    
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredient={this.props.ings} />
                    <BuildControls 
                        disabled={disabledInfo}
                        addIngredient={this.props.onAddIngredient} 
                        removeIngredient={this.props.onRemoveIngredient}
                        burgerPrice={this.props.price}
                        ordernow={this.pruchasingHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)} />
                </Aux>
            );

            orderSummary = <OrderSummary continued={this.orderContinueHandler} 
                                        cancelled={this.modelCloseHandler} 
                                        ingredients={this.props.ings}
                                        burgerPrice={this.props.price} />;
        }

        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.modelCloseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.price
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ing) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ing}),
        onRemoveIngredient: (ing) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ing})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));