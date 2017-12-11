import React, { Component } from "react";
import Order from "./order/order";
import axios from "../../axios-orders";
import globalErrorHandler from "../../hoc/globalErrorHandler";
import Spinner from "../../components/UI/spinner/spinner";
import Aux from "../../hoc/auxt";

import classes from "./orders.css";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then(req => {
        let orders = [];
        for (let i in req.data) {
          orders.push({
            ...req.data[i],
            id: i
          });
        }
        this.setState({ orders, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }
  render() {
    let orderitems = this.state.orders.map(order => {
      return (
        <Order
          price={order.price}
          key={order.id}
          ingredients={order.ingredients}
          customerName={order.customer.name}
          customerPhone={order.customer.phone}
        />
      );
    });

    if (this.state.loading) {
      orderitems = <Spinner />;
    }

    return (
      <Aux>
        <h1>Orders</h1>
        <div className={classes.orders}>{orderitems}</div>
      </Aux>
    );
  }
}
export default globalErrorHandler(Orders, axios);
