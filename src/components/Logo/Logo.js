import React from 'react';
import classes from './Logo.css';
import LogoImg from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={LogoImg} alt='Burger Builder' />
    </div>
)

export default logo;