import React from "react";
import classes from "./burger.css";
import BurgerIngredient from "./burgeringredient/burgeringredient";

const Burger = props => {
  let selectedIngredients;
  if (props.ingredients) {
    selectedIngredients = Object.keys(props.ingredients)
      .map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_, index) => {
          return <BurgerIngredient type={igkey} key={igkey + index} />;
        });
      })
      .reduce((a, b) => {
        return a.concat(b);
      });
    if (selectedIngredients.length === 0) {
      selectedIngredients = <p>Please select an ingredient.</p>;
    }
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="BreadTop" />
      {selectedIngredients}
      <BurgerIngredient type="BreadBottom" />
    </div>
  );
};

export default Burger;
