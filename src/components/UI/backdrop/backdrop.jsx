import React from "react";
import classes from "./backdrop.css";

const backdrop = props => {
  return (
    <div
      className={classes.backdrop}
      style={{ display: props.show ? "block" : "none" }}
      onClick={props.cancelOrder}
    />
  );
};

export default backdrop;
