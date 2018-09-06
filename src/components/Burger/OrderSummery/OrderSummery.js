import React from 'react';

import Button from './../../UI/Button/Button';
import Aux from './../../../hoc/Aux';

const orderSummery = (props) => {
    const ingrediantSummery = Object.keys(props.ingrediants)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingrediants[igKey]}
                </li>);
        });

    return (
        <Aux>
            <h3>Your Orde!</h3>
            <p>A delicious burger with the following ingrediants:</p>
            <ul>
                {ingrediantSummery}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Countiue to Checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelHandler}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinuedHandler}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummery;