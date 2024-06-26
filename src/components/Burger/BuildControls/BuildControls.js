import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.burgerPrice.toFixed(2)}</strong></p>
        {controls.map((ctrl) => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                type={ctrl.type} 
                added={() => props.addIngredient(ctrl.type)} 
                removed={() => props.removeIngredient(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button onClick={props.ordernow} className={classes.OrderButton} disabled={!props.purchasable}>
            {props.isAuth ? 'ORDER NOW' : 'Sign In To Proceed'}
        </button>
    </div>
)

export default buildControls;