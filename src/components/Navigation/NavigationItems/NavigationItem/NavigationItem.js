import React from 'react';
import cssClasses from './NavigationItem.module.css';

const NavigationItem = (props) => (
    <li className={cssClasses.NavigationItem}>
        <a href={props.link}
           className={props.active ? cssClasses.active : null}>{props.children}</a>
    </li>
)

export default NavigationItem;