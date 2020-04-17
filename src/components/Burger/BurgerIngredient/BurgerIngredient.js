import React from 'react';
import cssClasses from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends React.Component  {
    render() {
        let ingredient = null ;

        switch(this.props.type) {
            case 'bread-bottom': 
                ingredient = <div className={cssClasses.BreadBottom} id={this.props.id}></div>;
                break;
            case 'bread-top':
                ingredient = (<div className={cssClasses.BreadTop} id={this.props.id}>
                    <div className={cssClasses.Seeds1}></div>
                    <div className={cssClasses.Seeds2}></div>
                </div>);
                break;
            case 'meat':
                ingredient = <div className={cssClasses.Meat} id={this.props.id}></div>;
                break;
            case 'cheese':
                ingredient = <div className={cssClasses.Cheese} id={this.props.id}></div>;
                break;
            case 'bacon':
                ingredient = <div className={cssClasses.Bacon} id={this.props.id}></div>;
                break;
            case 'salad':
                ingredient = <div className={cssClasses.Salad} id={this.props.id}></div>;
                break;
            default:
                ingredient = null;
                break;
        }
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;