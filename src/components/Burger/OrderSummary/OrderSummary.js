import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate() {
        console.log('Order Summary update...');
    }

    render() {

        const ingredients = Object.keys(this.props.ingredients).map((key) => {
            return (<li key={key}><span>{key}</span> : {this.props.ingredients[key]}</li>);
        });
    
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total Price:</strong> ${this.props.burgerPrice.toFixed(2)}</p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.cancelled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.continued} btnType="Success">CONTINUE</Button>
            </Aux>
        );
    }
    
}

export default OrderSummary;