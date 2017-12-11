import React from "react";
import classes from "./burgercontrol.css";

const BurgerControl = props => {
  return (
    <div className={classes.build_control}>
      <p>{props.label}</p>
      <button onClick={props.removed} disabled={props.disabled}>
        less
      </button>
      <button onClick={props.added}>more</button>
    </div>
  );
};

export default BurgerControl;
