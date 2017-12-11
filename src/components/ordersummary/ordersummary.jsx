import React, { Component } from "react";
import classes from "./ordersummary.css";
import Spinner from "../UI/spinner/spinner";

class ordersummary extends Component {
  componentWillUpdate() {
    // for debugging purposes
    //console.log("[Order Summary] will update");
  }
  render() {
    let list = <Spinner />;
    if (this.props.ingredients) {
      list = Object.keys(this.props.ingredients)
        .map(igkey => {
          return (
            this.props.ingredients[igkey] && (
              <li key={igkey}>
                <strong>{igkey.toUpperCase() + " :"}</strong>
                <span> {this.props.ingredients[igkey]} </span>
              </li>
            )
          );
        })
        .filter(item => {
          return item !== 0;
        });
    }

    return (
      <div className={classes.order}>
        <h2>Order Summary</h2>
        <ul>
          {list}
          <li className={classes.pricerow}>
            <strong>Total Price : </strong>{" "}
            <span>₹ {this.props.price.toFixed(2)}</span>
          </li>
        </ul>
        <div className={classes.orderBtnWrapper}>
          <button className={classes.continue} onClick={this.props.saveOrder}>
            Continue
          </button>
          <button className={classes.cancel} onClick={this.props.cancelOrder}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default ordersummary;
