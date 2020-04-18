import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
//this could be a functional component doesnt hav to be a class
    componentDidUpdate() {
        console.log(';;;;;;;;;  order summary updated')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((item)=> {
            return (
                <li key={item}>
                    <span style={{textTransform: 'capitalize'}}>{item}</span>: {this.props.ingredients[item]}
                </li>)
        });
        return (
                <Aux>
                    <h3>Your Order</h3>
                    <p>A delicious burger with ingredients</p>
                    <ul>{ingredientSummary}</ul>
                    <p><strong>Total price: {this.props.totalPrice.toFixed(2)}</strong></p>
                    <p>Continue to checkout?</p>
                    <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}>CANCEL</Button>
                    <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>CONTINUE</Button>
                </Aux>
            )
        }
}

export default OrderSummary;