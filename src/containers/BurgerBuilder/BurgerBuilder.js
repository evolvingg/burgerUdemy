import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {ADD_INGREDIENTS , REMOVE_INGREDIENT} from '../../store/actions';


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

    updatePurchaseState = ( ingredients ) => {
        const sum = Object.keys(ingredients)
                    .map( igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    }, 0);
        return sum > 0;
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

        this.props.history.push( '/checkout'); 
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients couldnot be loaded</p> : <Spinner/>;
        
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        addIn = {this.props.onIngredientAdded} 
                        removeIn = {this.props.onIngredientRemoved}
                        disabledInfo = {disabledInfo} 
                        total = {this.props.totPrice} 
                        purchaseable = {this.updatePurchaseState(this.props.ings)}
                        purchaseHandler  = {this.purchaseHandler}
                        />
                </Aux>
            )
            orderSummary = <OrderSummary 
                ingredients = {this.props.ings}
                purchaseContinueHandler = {this.purchaseContinueHandler}
                purchaseCancelHandler = {this.purchaseCancelHandler}
                totalPrice = {this.props.totPrice}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totPrice: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: ADD_INGREDIENTS, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({type: REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));