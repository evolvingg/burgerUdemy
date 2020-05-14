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
            ingredients : null,
            totalPrice: 4,
            purchaseable: false,
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount() {
        axiosInstance.get('/ingredients.json')
                .then(response => {
                    console.log('res::',response.data);
                    this.setState({ingredients: response.data});
                })
                .catch(error => {
                    this.setState({error: true});
                })
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
        //this.props.history.push('/checkout'); //push a new prop on to the stack of pages , to redirect to another page
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        }); 
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients couldnot be loaded</p> : <Spinner/>;
        
        if(this.state.ingredients) {
            burger = (
                <Aux>
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
            orderSummary = <OrderSummary 
                ingredients = {this.state.ingredients}
                purchaseContinueHandler = {this.purchaseContinueHandler}
                purchaseCancelHandler = {this.purchaseCancelHandler}
                totalPrice = {this.state.totalPrice}
            />;
        }

        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);