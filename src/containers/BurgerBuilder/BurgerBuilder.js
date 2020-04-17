import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients : {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchaseable: false,
            purchasing: false
        }
    }

    updatePurchaseState = () => {
        this.setState((prevState) =>{
            const ingredients = {...prevState.ingredients};
            const sum = Object.keys(ingredients).map((ingr) => {
                return ingredients[ingr];
            }).reduce((prev ,current)=> {
                return  prev + current
            },0);
            return {purchaseable: sum>0};
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newVal = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newVal;
        const priceAddition = INGREDIENT_PRICES[type];
        const prevPrice = this.state.totalPrice;
        this.setState({ingredients: updatedIngredients, totalPrice: prevPrice + priceAddition });
        this.updatePurchaseState();
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount === 0) {
            return;
        }
        const newVal =  oldCount - 1 ;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newVal;
        const priceLoss = INGREDIENT_PRICES[type];
        const prevPrice = this.state.totalPrice;
        this.setState({ingredients: updatedIngredients, totalPrice: prevPrice - priceLoss });
        this.updatePurchaseState();
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
        //this.props.backDropHandler();
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} hide={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIn = {this.addIngredientHandler} 
                removeIn = {this.removeIngredientHandler}
                disabledInfo = {disabledInfo} 
                total = {this.state.totalPrice} 
                purchaseable = {this.state.purchaseable}
                purchaseHandler  = {this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;