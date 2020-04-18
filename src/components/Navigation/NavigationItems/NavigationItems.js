import React from 'react';
import cssClasses from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'; 

const NavigationItems = (props) => (
    <ul className = {cssClasses.NavigationItems}>
        <NavigationItem link="/" active={true}>Burger Menu</NavigationItem>
        <NavigationItem link="/" >Checkout</NavigationItem>
    </ul>
)

export default NavigationItems;