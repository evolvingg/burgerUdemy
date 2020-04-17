import React from 'react';
import cssClasses from './Backdrop.module.css';

const Backdrop = (props) => (
    props.show === true ? <div className={cssClasses.Backdrop} onClick={props.hideModal}></div> : null
)


export default Backdrop;