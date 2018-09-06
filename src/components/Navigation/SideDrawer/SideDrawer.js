import React from 'react';

import classes from './SideDrawer.css';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Aux from './../../../hoc/Aux';

const sideDrawer = (props) => {
    let attahedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attahedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attahedClasses.join(' ')} onClick={props.closed}>
                <Logo height="11%" />
                <NavigationItems isAuthenticated={props.isAuth} />
            </div>
        </Aux>
    );
};

export default sideDrawer;