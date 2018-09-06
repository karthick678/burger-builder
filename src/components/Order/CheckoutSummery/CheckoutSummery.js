import React from 'react';

import classes from './CheckoutSummery.css';
import Button from './../../UI/Button/Button';
import Burger from './../../Burger/Burger';

const checkoutSummery = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well!</h1>
            <div style={{ width: "100%", margin: "auto" }}>
                <Burger ingrediants={props.ingrediants} />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>
                CANCEL
            </Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>
                CONTINUE
            </Button>
        </div>
    )
};

export default checkoutSummery;