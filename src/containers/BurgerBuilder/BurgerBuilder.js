import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        ingredient : {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        purchasable: false,
        purchasing:false,
        totalPrice: 1.5
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
        alert('You Continue!');
    }

    render() {

        let disabledInfo = {...this.state.ingredient};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }        

        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.modelCloseHandler}>
                    <OrderSummary continued={this.orderContinueHandler} 
                                cancelled={this.modelCloseHandler} 
                                ingredients={this.state.ingredient}
                                burgerPrice={this.state.totalPrice} />
                </Modal>
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
    }

}

export default BurgerBuilder;