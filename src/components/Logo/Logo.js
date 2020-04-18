import React from 'react';
import burgerLogo from '../../assets/images/original.png';
import cssClasses from './Logo.module.css';

const Logo = (props) => {
    return (
        <div className={cssClasses.Logo}>
            <img src={burgerLogo} alt="burger"/>
        </div>
    )
}

export default Logo;