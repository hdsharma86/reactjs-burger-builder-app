import React from 'react';
import NavLink from './NavLink/NavLink';
import classes from './NavigationItem.css';

const navigationItem = () => (
    <ul className={classes.NavigationItem}>
        <NavLink link="/">Burger Builder</NavLink>
        <NavLink link="/orders">Orders</NavLink>
    </ul>
);

export default navigationItem;