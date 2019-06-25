import React from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './SideDrawer.css';
import BackDrop from '../../Backdrop/Backdrop';
import Aux from '../../../../hoc/Aux/Aux';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <Logo height="10%" />
                <nav>
                    <NavigationItem />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;