import React from "react";
import Burger from "../burger/Burger";

const checkoutSummary = props => {
  return <Burger ingredients={props.ingredients} />;
};

export default checkoutSummary;
