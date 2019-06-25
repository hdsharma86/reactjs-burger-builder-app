import React from 'react';
import NavLink from './NavLink/NavLink';
import classes from './NavigationItem.css';

const navigationItem = () => (
    <ul className={classes.NavigationItem}>
        <NavLink active link="/">Burger Builder</NavLink>
        <NavLink link="/sdfsdf">Checkout</NavLink>
    </ul>
);

export default navigationItem;