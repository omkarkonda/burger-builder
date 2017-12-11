import React from "react";
import classes from "./order.css";
const order = props => {
  const ingredients = [];
  for (let name in props.ingredients) {
    ingredients.push({ name, count: props.ingredients[name] });
  }

  const transformedIngredients = ingredients.map(ig => {
    return (
      <span key={ig.name} className={classes.ig}>
        {ig.name} : ({ig.count})
      </span>
    );
  });

  return (
    <div className={classes.order}>
      <div className={classes.customer}>
        <span>{props.customerName}</span>
        <span>{props.customerPhone}</span>
      </div>
      <h3 style={{ padding: 0, margin: 0, color: "white" }}>
        Price: ₹ {props.price}
      </h3>
      <div>{transformedIngredients}</div>
    </div>
  );
};

export default order;
