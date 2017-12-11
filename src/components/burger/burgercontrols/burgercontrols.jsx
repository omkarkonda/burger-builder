import React from "react";
import BurgerControl from "./burgercontrol/burgercontrol";

import classes from "./buildcontrols.css";

const BurgerControls = props => {
  let controls;
  if (props.ingredients) {
    controls = Object.keys(props.ingredients).map(key => {
      return (
        <BurgerControl
          label={key}
          key={key}
          added={() => props.ingredientAdded(key)}
          removed={() => props.ingredientRemoved(key)}
          disabled={props.disabled[key]}
        />
      );
    });
  } else {
    controls = "ingredients loading....";
  }
  return (
    <div className={classes.wrapper}>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      {controls}
      <button
        className={classes.orderButton}
        onClick={props.orderNow}
        disabled={!props.purchasable}
      >
        Order Now
      </button>
    </div>
  );
};

export default BurgerControls;
