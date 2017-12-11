import React, { Component } from "react";
import CheckoutSummary from "../../components/checkoutSummary/checkoutSummary";
import CheckoutForm from "../checkoutform/checkoutform";
import axios from "../../axios-orders";
import globalErrorHandler from "../../hoc/globalErrorHandler";
import classes from "./checkout.css";

class checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentDidMount() {
    this.setState({
      ingredients: this.props.location.state.ingredients,
      price: this.props.location.state.price
    });
  }

  render() {
    return (
      <div className={classes.checkout}>
        <h2 style={{ textAlign: "center" }}>Your burger is ready!</h2>
        <CheckoutSummary ingredients={this.state.ingredients} />
        <CheckoutForm
          ingredients={this.state.ingredients}
          price={this.state.price}
          {...this.props}
        />
      </div>
    );
  }
}

export default globalErrorHandler(checkout, axios);
