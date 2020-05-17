import React from 'react';
import cssClasses from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => (
    <li className={cssClasses.NavigationItem}>
        <NavLink 
        to={props.link}
        activeClassName={cssClasses.active}
        exact={props.exact}
           >{props.children}</NavLink>
    </li>
)

export default NavigationItem;