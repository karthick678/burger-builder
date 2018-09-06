import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';
import Spinner from './../../components/UI/Spinners/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;

        if (this.props.orders) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingrediants={order.ingrediants}
                    price={+order.price} />
            ))
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapStateToDispatch = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapStateToDispatch)(withErrorHandler(Orders, axios));