import React, { Component } from "react";
import Layout from "./hoc/layout/layout";
import { Route, Switch } from "react-router-dom";
import Topbar from "./components/UI/topbar/topbar";
import BurgerBuilder from "./containers/burgerbuilder/burgerbuilder";
import Orders from "./containers/orders/orders";
import Checkout from "./containers/checkout/checkout";

class App extends Component {
  render() {
    return (
      <Layout>
        <Topbar />
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
