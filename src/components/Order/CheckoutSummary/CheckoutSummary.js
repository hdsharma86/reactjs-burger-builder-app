import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
const checkoutSummary = (props) => {
    return (
        <div className={classes.Checkout}>
            <p>We hope your burger teastes well!!!</p>
            <Burger ingredient={props.ingredient} />
            <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>Checkout</Button>
        </div>
    );
}

export default checkoutSummary;