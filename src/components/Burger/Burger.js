import React from 'react';
import cssClasses from './Burger.module.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transformedIngredient;
    transformedIngredient = Object.keys(props.ingredients).map((ingred)=> {
        return [...Array(props.ingredients[ingred])].map((_, i) => {
            return <BurgerIngredient  key={ingred+i} type={ingred} id={i} />
        })
    }).reduce((prev ,nex) => {
        return [...prev,...(nex)];
        // return prev.concat(nex);
    },[])

    if(transformedIngredient.length === 0) {
        transformedIngredient = <p>Pleas start adding ingredient</p>;
    }
    console.log(transformedIngredient);
    return (
        <div className = {cssClasses.Burger}>
            <BurgerIngredient type={'bread-top'} />
                {transformedIngredient}
            <BurgerIngredient type={'bread-bottom'} />
        </div>
    )
}

export default Burger;