import React from 'react';
import cssClasses from './Button.module.css';

const Button = (props) => {
    return (<div className={cssClasses.Button}>
        {props.label}
    </div>)
}

export default Button;