import React from 'react';
import cssClasses from './Button.module.css';

const Button = (props) => {
    return (
        <button 
        className={[cssClasses.Button, cssClasses[props.btnType]].join(' ')} 
        onClick={props.clicked}
        disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default Button;