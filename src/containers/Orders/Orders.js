import React, { Component } from 'react';
import axios from '../../axios-connector';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {

    state = {
        orders: null,
        loading: true
    }

    async componentDidMount() {
        try {
            const orders = await axios.get('/orders.json');
            const orderArray = [];
            for (let key in orders.data){
                orderArray.push({
                    ...orders.data[key],
                    id: key
                });
            }
            this.setState({
                orders: orderArray,
                loading: false
            });
        } catch (error) {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        let orders = '';
        if(this.state.orders){
            orders = this.state.orders.map( order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            });
        }

        if(this.state.loading){
            orders = <Spinner />;
        }

        return (
            <div>
                {orders}
            </div>
        );
    }

}

export default WithErrorHandler(Orders, axios);