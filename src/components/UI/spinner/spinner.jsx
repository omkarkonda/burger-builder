import React from "react";
import classes from "./spinner.css";

const spinner = () => {
  return (
    <div className={classes.spinner}>
      <div className={classes.dot1} />
      <div className={classes.dot2} />
    </div>
  );
};

export default spinner;
