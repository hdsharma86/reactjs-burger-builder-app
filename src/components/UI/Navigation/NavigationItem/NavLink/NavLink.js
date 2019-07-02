import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavLink.css';

const navLink = (props) => {
    const isExact = props.link === '/' ? true : false;
    return (
        <li className={classes.NavLink}>
            <NavLink exact={isExact} activeClassName={classes.active} 
                to={props.link}>
                {props.children}
            </NavLink>
        </li>
    );
}

export default navLink;