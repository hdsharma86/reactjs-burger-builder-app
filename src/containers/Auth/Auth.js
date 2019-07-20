import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as authActions from '../../store/actions/auth';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-connector';

class Auth extends Component {

    state = {
        authForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username | Email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 100
                },
                isValid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 30
                },
                isValid: false,
                touched: false
            },
        },
        isSignup: true
    }

    authModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        });
    }

    authFormSubmitHandler = (event) => {
        event.preventDefault();
        //this.setState({loading: true});

        const formData = {};
        for(let elementIdentifier in this.state.authForm){
            formData[elementIdentifier] = this.state.authForm[elementIdentifier].value;
        }
        this.props.onAuthStart(formData.username, formData.password, this.state.isSignup);
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

        const updatedOrderForm = {...this.state.authForm};
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
            authForm: updatedOrderForm,
            isFormValid: isFormValid
        });
    }

    errorMessageHandler = (error) => {
        switch (error){
            case 'INVALID_EMAIL': return 'Invalid email address!';
            case 'EMAIL_EXISTS': return 'User already exists with this email address!';
            default: return 'Something went wrong';
        }
    }

    render() {

        const elements = Object.keys(this.state.authForm).map((element) => {
            return <Input changed={(event) => this.inputChangeHandler(event, element)} 
                        key={element} 
                        elementType={this.state.authForm[element].elementType} 
                        elementConfig={this.state.authForm[element].elementConfig} 
                        value={this.state.authForm[element].value}
                        invalid={!this.state.authForm[element].isValid}
                        touched={this.state.authForm[element].touched} />;
        });

        let errorMessage = null;
        if(this.props.error) {
            const message = this.errorMessageHandler(this.props.error.message);
            errorMessage = (<p style={{color:'red'}}>{message}</p>);
        }

        let uiData = (<React.Fragment>
            <h4>{this.state.isSignup ? 'Customer Registration' : 'Customer Authentication' }</h4>
            {errorMessage}
            <form onSubmit={this.authFormSubmitHandler}>
                {elements}
                <Button disabled={!this.state.isFormValid}  btnType="Success">Submit</Button>
            </form>
            <Button clicked={this.authModeHandler} btnType="Danger">Switch To {this.state.isSignup ? 'SIGN-IN' : 'SIGN-UP'}</Button>
            </React.Fragment>);

        if(this.props.loading){
            uiData = <Spinner />;
        }

        if(this.props.token){
            uiData = <Redirect to={this.props.authRedirectUri} />
        }

        return (
            <div className={classes.Auth}>
                {uiData}
            </div>
        );
        
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        authRedirectUri: state.auth.redirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthStart: (username, password, isSignup) => dispatch(authActions.auth(username, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Auth, axios));

