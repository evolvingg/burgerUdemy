import React from 'react';
import cssClasses from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    let inputClass = [cssClasses.InputElement];
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClass.push(cssClasses.Invalid);
        validationError = <p>Please enter a valid value!</p>;
    }

    switch(props.elementType) {
        case ('input'):
            inputElement  = <input 
                            onChange ={props.changed}
                            className={inputClass.join(' ')} 
                            {...props.elementConfig}
                            value={props.value} />;
            break;
        case ('textarea'):
            inputElement  = <textarea 
                            className={inputClass.join(' ')} 
                            onChange ={props.changed}
                            {...props.elementConfig}
                            value={props.value} />;
            break;
        case ('select'):
            inputElement  = (<select 
                            className={inputClass.join(' ')} 
                            onChange ={props.changed}
                            value={props.value}>
                                {props.elementConfig.options.map((opt)=>(
                                <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                                ))}
                            </select>);
            break;
        default:
            inputElement = <input 
                            className={inputClass.join(' ')} 
                            onChange ={props.changed}
                            {...props.elementConfig}
                            value={props.value}  />
    }

    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}>
                {props.label}
            </label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;