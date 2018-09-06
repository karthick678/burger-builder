import React from "react";
import classes from "./Input.css";

const input = (props) => {
    let inputElement = null;

    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementtype) {
        case "input":
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementconfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case "textare":
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementconfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case "select":
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    {...props.elementconfig}
                    value={props.value}
                    onChange={props.changed}>
                    {
                        props.elementconfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))
                    }
                </select>
            );
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.elementconfig} />
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
