import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import cssClasses from './BuildControls.module.css';

const controls = [ 
    {label: 'Salad' ,type:'salad'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Meat', type:'meat'}
]

const BuildControls = (props) => {
    return (
    <div className={cssClasses.BuildControls}>
        <p>Current Price: <strong>{props.total.toFixed(2)}</strong></p>
        {
            controls.map((item) => {
            return <BuildControl 
                    label = {item.label}  
                    key = {item.label}
                    add = {()=>props.addIn(item.type)} 
                    remove = {()=>props.removeIn(item.type)}
                    disabledInfo = {props.disabledInfo[item.label]}
                    />
            })
        }
        <button 
        className={cssClasses.OrderButton} 
        disabled={!props.purchaseable}
        onClick={props.purchaseHandler}>ORDER NOW</button>
    </div>)
}

export default BuildControls;