import React from 'react';
import Aux from '../../hoc/Aux';
import cssClasses from './Layout.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';

const Layout = (props) => (
    <Aux>
        <div>toolbar ,sidebar ,backdrop</div>
        <main className={cssClasses.Content}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;