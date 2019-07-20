import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from './Layout.css';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuth} toggleHandler={this.sideDrawerToggleHandler} />
                <SideDrawer isAuth={this.props.isAuth} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.content}>{this.props.children}</main>
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);