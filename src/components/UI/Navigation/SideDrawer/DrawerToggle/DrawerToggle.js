import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => {

    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div className={classes.Bar1}></div>
            <div className={classes.Bar2}></div>
            <div className={classes.Bar3}></div>
        </div>
    );

}

export default drawerToggle;