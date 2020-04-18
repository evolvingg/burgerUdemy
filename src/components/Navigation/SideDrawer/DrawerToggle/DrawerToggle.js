import React from 'react';
import cssClasses from './DrawerToggle.module.css';

const DrawerToggle = (props) => (
    <div onClick={props.clicked} className={cssClasses.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default DrawerToggle;