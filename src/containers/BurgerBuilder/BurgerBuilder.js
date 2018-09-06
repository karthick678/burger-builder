import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from './../../hoc/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummery from './../../components/Burger/OrderSummery/OrderSummery';
import Spinner from './../../components/UI/Spinners/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './../../store/actions/index';
import axios from './../../axios-order';

class BurgerBuilder extends Component {
    state = {
        purchasaing: false
    };

    componentDidMount() {
        this.props.onitIngrediants();
    }

    updatePurchaseState(ingrediants) {
        const sum = Object.keys(ingrediants)
            .map(igKey => {
                return ingrediants[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasaing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasaing: false
        });
    };

    purchaseContinueHandler = () => {
        this.props.onInitpurchash();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingrediants can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingrediants={this.props.ings} />
                    <BuildControls
                        disabled={disabledInfo}
                        ingrediantAdded={this.props.onIngrediantAdded}
                        ingrediantRemoved={this.props.onIngrediantRemoved}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)} />
                </Aux>
            );
            orderSummary = <OrderSummery
                price={this.props.price}
                purchaseCancelHandler={this.purchaseCancelHandler}
                purchaseContinuedHandler={this.purchaseContinueHandler}
                ingrediants={this.props.ings} />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasaing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingrediants,
        price: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngrediantAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngrediantRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onitIngrediants: () => dispatch(actions.initIngrediants()),
        onInitpurchash: () => dispatch(actions.purchashInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));