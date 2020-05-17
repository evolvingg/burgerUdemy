import React from 'react';
import cssClasses from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'; 

const NavigationItems = (props) => (
    <ul className = {cssClasses.NavigationItems}>
        <NavigationItem link="/" exact>Burger Menu</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
    </ul>
)

export default NavigationItems;