import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((item)=> {
        return (
            <li key={item}>
                <span style={{textTransform: 'capitalize'}}>{item}</span>: {props.ingredients[item]}
            </li>)
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with ingredients</p>
            <ul>{ingredientSummary}</ul>
            <p>Continue to checkout?</p>
            <Button label={'CANCEL'} />
            <Button label={'CONTINUE'} />
        </Aux>
    )
}

export default OrderSummary;