import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../../Logo/Logo';
import NavigationItem from '../NavigationItem/NavigationItem';
import DrawerToggle from '../../../UI/Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggleHandler} />
        <Logo height="80%" />
        <nav className={classes.DesktopOnly}><NavigationItem isAuth={props.isAuth} /></nav>
    </header>
);

export default toolbar;