import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
            purchasing: false,
            loading: false
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

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'tanvi',
                address: {
                    street: 'test',
                    zipcode: '800020',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axiosInstance.post('/orders.jsn',order)
            .then( response => {
                this.setState({ loading: false, purchasing: false });
            } )
            .catch( error => {
                this.setState({ loading: false, purchasing: false });
            } );
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary 
                ingredients = {this.state.ingredients}
                purchaseContinueHandler = {this.purchaseContinueHandler}
                purchaseCancelHandler = {this.purchaseCancelHandler}
                totalPrice = {this.state.totalPrice}
        />;

        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
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

export default withErrorHandler(BurgerBuilder, axiosInstance);