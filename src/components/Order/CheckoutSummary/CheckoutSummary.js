import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hhope it tastes gud</h1>
            <div style={{width: '300px' ,height: '300px',margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button 
                btnType="Danger" 
                clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;