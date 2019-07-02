import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import axios from '../../axios-connector';

const INGREDIENT_PRICE = {
    salad: 0.4,
    cheese: 0.8,
    bacon: 1,
    meat: 1.9
};

class BurgerBuilder extends Component {
    
    /*constructor(props){
        super(props);
        this.state = {...};
    }*/

    state = {
        ingredient : null,
        purchasable: false,
        purchasing:false,
        loading: false,
        totalPrice: 1.5,
        error: false
    }

    componentDidMount(){
        axios.get('ingredients.json').then((response) => {
            
            const ingredients = response.data;
            this.setState({ingredient: ingredients});

        }).catch((e) => {
            this.setState({
                error: true
            });
        });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key];
        }).reduce((sum, num) => {
            return sum + num;
        });
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        console.log(type);
        const oldCount = this.state.ingredient[type];
        const newCount = oldCount + 1;
        const updatedIngrdients = {...this.state.ingredient};
        updatedIngrdients[type] = newCount;

        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredient: updatedIngrdients
        });
        this.updatePurchaseState(updatedIngrdients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        if(oldCount <= 0){ 
            return 
        }
        const newCount = oldCount - 1;
        const updatedIngrdients = {...this.state.ingredient};
        updatedIngrdients[type] = newCount;

        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredient: updatedIngrdients
        });
        this.updatePurchaseState(updatedIngrdients);
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

        const queryParams = [];
        for(let i in this.state.ingredient){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredient[i]));
        }
        queryParams.push('price='+encodeURIComponent(this.state.totalPrice));
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        });

    }

    render() {

        let disabledInfo = {...this.state.ingredient};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }        

        let burger = this.state.error ? <div>Ingredient can't be loaded!</div> : <Spinner />;
        let orderSummary = null;
    
        if(this.state.ingredient){
            burger = (
                <Aux>
                    <Burger ingredient={this.state.ingredient} />
                    <BuildControls 
                        disabled={disabledInfo}
                        addIngredient={this.addIngredientHandler} 
                        removeIngredient={this.removeIngredientHandler}
                        burgerPrice={this.state.totalPrice}
                        ordernow={this.pruchasingHandler}
                        purchasable={this.state.purchasable} />
                </Aux>
            );

            orderSummary = <OrderSummary continued={this.orderContinueHandler} 
                                        cancelled={this.modelCloseHandler} 
                                        ingredients={this.state.ingredient}
                                        burgerPrice={this.state.totalPrice} />;
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

export default WithErrorHandler(BurgerBuilder, axios);