import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as BurgerBuilderActions from '../../store/actions/burgerBuilder';
import * as actions from '../../store/actions/order';
import * as authActions from '../../store/actions/auth';

import axios from '../../axios-connector';

class BurgerBuilder extends Component {
    
    state = {
        purchasing:false,
        loading: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
        if( this.props.isBuilding ){
            this.props.onSetAuthRedirectPath('/');
        }
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key];
        }).reduce((sum, num) => {
            return sum + num;
        });
        return sum > 0;
    }

    pruchasingHandler = () => {
        if(this.props.isAuth){
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/sign-in');
        }
    }

    modelCloseHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    orderContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {

        let disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }        

        let burger = this.props.error ? <div>Ingredient can't be loaded!</div> : <Spinner />;
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
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        isAuth={this.props.isAuth} />
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
        isBuilding: state.burgerBuilder.isBuilding
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ing) => dispatch(BurgerBuilderActions.addIngredient(ing)),
        onRemoveIngredient: (ing) => dispatch(BurgerBuilderActions.removeIngredient(ing)),
        onInitIngredients: () => dispatch(BurgerBuilderActions.initIngredient()),
        onInitPurchase: () => dispatch(actions.initPurchase()),
        onSetAuthRedirectPath: (path) => { dispatch(authActions.setAuthRedirectPath(path)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));