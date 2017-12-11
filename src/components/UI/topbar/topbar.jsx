import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./topbar.css";

const topbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.logo}>Logo</div>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName={classes.active}>
            Burger Builder
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" activeClassName={classes.active}>
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default topbar;
