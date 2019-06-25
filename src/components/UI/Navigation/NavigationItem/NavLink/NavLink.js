import React from 'react';
import classes from './NavLink.css';

const navLink = (props) => (
    <li className={classes.NavLink}>
        <a className={props.active ? classes.active : null} 
            href={props.link}>
            {props.children}
        </a>
    </li>
)

export default navLink;