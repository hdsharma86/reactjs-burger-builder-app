import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let initialClass = props.elementType === 'select' ? classes.Select : classes.Input;
    let inputClasses = [initialClass];
    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid);
    }
    switch(props.elementType){
        case('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value} />;
        break;

        case('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value} />;
            break;

        case('select'):
            const options = Object.keys(props.elementConfig.options).map(option => {
                return <option key={props.elementConfig.options[option].value} value={props.elementConfig.options[option].value}>
                        {props.elementConfig.options[option].displayName}
                        </option>
            });
            inputElement = <select className={inputClasses.join(' ')} onChange={props.changed}>{options}</select>;
            break;

        default: 
            inputElement = <input className={inputClasses.join(' ')} {...props} onChange={props.changed} />;
            break;
    }

    return inputElement;
    
}

export default input;