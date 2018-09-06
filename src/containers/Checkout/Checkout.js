import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummery from './../../components/Order/CheckoutSummery/CheckoutSummery';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let summary = <Redirect to="/"/>

        if (this.props.ings) {
            const purchashedRedirect = this.props.purchashed ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchashedRedirect}
                    <CheckoutSummery
                        ingrediants={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingrediants,
        purchashed: state.order.purchashed
    }
};

export default connect(mapStateToProps)(Checkout);