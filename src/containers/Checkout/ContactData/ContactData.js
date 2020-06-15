import React from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from  './ContactData.module.css';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';

class ContactData extends React.Component {
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postalcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your emailid'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }, 
        },
        formIsValid: false,
        loading: false
    }


    checkValidity(value, rules) {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangedHandler = (e, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formValid = true;
        for(let key in updatedOrderForm) {
        
            formValid =  updatedOrderForm[key].valid && formValid;
        }
        console.log(formValid,updatedOrderForm)

        this.setState({orderForm: updatedOrderForm, formIsValid: formValid});
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formDataIdentifier in this.state.orderForm) {
            formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value;
        }
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };
        axiosInstance.post('/orders.json',order)
            .then( response => {
                this.setState({ loading: false });
            } )
            .catch( error => {
                this.setState({ loading: false });
            } );
    }

    render() {
        const formElementsArr = [];
        for(let i in this.state.orderForm) {
            formElementsArr.push({
                id: i,
                config: this.state.orderForm[i]
            });
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArr.map((formElement) => {
                return <Input elementType={formElement.config.elementType}
                                key={formElement.id}
                                elementConfig={formElement.config.elementConfig}
                                changed={(e)=>this.inputChangedHandler(e,formElement.id)}
                                shouldValidate={formElement.config.validation}
                                invalid={!formElement.config.valid}
                                touched={formElement.config.touched}
                                value={formElement.config.value}/>
            })}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);
        if(this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={cssClasses.ContactData}>
                <h4>Enter your ContactData</h4>
                {form}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);