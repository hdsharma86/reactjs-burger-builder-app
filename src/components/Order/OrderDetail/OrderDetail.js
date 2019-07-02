import React, { Component } from 'react';
import axios from '../../../axios-connector';
import classes from './OrderDetail.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';

class OrderDetail extends Component {
    
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20
                },
                isValid: false,
                touched: false
            },

            street: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Street Address'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },

            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 8
                },
                isValid: false,
                touched: false
            },
            
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayName: 'Fastest'},
                        {value: 'ordinary', displayName: 'Ordinary'}
                    ]
                },
                value: '',
                isValid: true
            },
        },
        isFormValid: false,
        ingredients: null,
        totalPrice: 0,
        loading: false
    };

    componentWillMount() {
        this.setState({
            ingredients: this.props.ingredient,
            totalPrice: this.props.price
        });
    }

    orderFormSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const formData = {};
        for(let elementIdentifier in this.state.orderForm){
            formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
        }
        const orderDetail = {
            ingredients: this.props.ingredient,
            price: this.state.totalPrice,
            orderDetail: formData
        };

        axios.post('orders.json', orderDetail)
        .then((response) => {
            this.setState({loading: false, purchasing: false});
            console.log(response);
            this.props.history.push('/');
        })
        .catch((e) => {
            this.setState({loading: false, purchasing: false});
            console.log(e)
        });
    }

    checkValiditiy = (value, rules) => {
        let isValid = true;
        if(rules){

            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
    
            if(rules.minLength){
                isValid = value.trim().length >= rules.minLength && isValid;
            }
    
            if(rules.maxLength){
                isValid = value.trim().length <= rules.maxLength && isValid;
            }
        }
        
        return isValid;
    }

    inputChangeHandler = (event, elementIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[elementIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.isValid = this.checkValiditiy(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[elementIdentifier] = updatedFormElement;

        let isFormValid = true;
        for(let elementIdentifier in updatedOrderForm){
            isFormValid = updatedOrderForm[elementIdentifier].isValid && isFormValid;
        }
  
        this.setState({
            orderForm: updatedOrderForm,
            isFormValid: isFormValid
        });
    }

    render() {

        const elements = Object.keys(this.state.orderForm).map((element) => {
            return <Input changed={(event) => this.inputChangeHandler(event, element)} 
                        key={element} 
                        elementType={this.state.orderForm[element].elementType} 
                        elementConfig={this.state.orderForm[element].elementConfig} 
                        value={this.state.orderForm[element].value}
                        invalid={!this.state.orderForm[element].isValid}
                        touched={this.state.orderForm[element].touched} />;
        });

        let uiData = (<React.Fragment>
            <h4>Please provide your detail before proceed further</h4>
            <form onSubmit={this.orderFormSubmitHandler}>
                {elements}
                <Button disabled={!this.state.isFormValid}  btnType="Success">Place Order</Button>
            </form></React.Fragment>);

        if(this.state.loading){
            uiData = <Spinner />;
        }

        return (
            <div className={classes.OrderDetail}>
                {uiData}
                <small><strong>Note: Payment method will be COD(Cash On Delivery)</strong></small>
            </div>
        );
    }

}

export default OrderDetail;