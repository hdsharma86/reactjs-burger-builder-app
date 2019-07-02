import React from 'react';
import classes from './Order.css';

const order = (props) => {

    const ingredients = Object.keys(props.ingredients).map((ing) => {
        return (<span key={ing} style={{
            textTransform: 'capitalize',
            border: '1px solid #ccc',
            padding: '5px',
            margin: '0 8px',
            boxShadow: '0 2px 3px #ccc',
            display: 'inline-block'
        }}>{ing + "("+props.ingredients[ing]+")"}</span>);
    });
    
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Total Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );

}

export default order;