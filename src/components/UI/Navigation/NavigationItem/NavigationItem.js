import React from 'react';
import NavLink from './NavLink/NavLink';
import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <ul className={classes.NavigationItem}>
        <NavLink link="/">Burger Builder</NavLink>
        {props.isAuth ? <NavLink link="/orders">Orders</NavLink> : null}
        {!props.isAuth 
            ? <NavLink link="/sign-in">Login</NavLink>
            : <NavLink link="/logout">Logout</NavLink>
        }
    </ul>
);

export default navigationItem;  