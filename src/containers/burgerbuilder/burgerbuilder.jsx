import React, { Component } from "react";
import Aux from "../../hoc/auxt";
import Burger from "../../components/burger/Burger";
import BurgerControls from "../../components/burger/burgercontrols/burgercontrols";
import Model from "../../components/UI/model/model";
import OrderSummary from "../../components/ordersummary/ordersummary";
import Backdrop from "../../components/UI/backdrop/backdrop";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinner/spinner";
import globalErrorHandler from "../../hoc/globalErrorHandler";

const INGREDIENT_PRICE = {
  meat: 10,
  cheese: 20,
  bacon: 5,
  salad: 5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    burgerPrice: 20,
    purchasing: false,
    purchasable: false,
    loading: false,
    error: false
  };
  componentWillUnmount() {
    console.log("burger builder unmounted");
  }
  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        const ingredients = response.data;
        let igPrice = Object.keys(ingredients)
          .map(igkey => {
            return ingredients[igkey] > 0
              ? ingredients[igkey] * INGREDIENT_PRICE[igkey]
              : null;
          })
          .reduce((acc, el) => {
            return acc + el;
          }, 0);

        this.setState((prevState, props) => {
          return {
            ingredients,
            burgerPrice: prevState.burgerPrice + igPrice
          };
        }, this.updatePurchasable(ingredients));
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchasable = ingredients => {
    let count = Object.values(ingredients).reduce((prev, next) => {
      return prev + next;
    });

    this.setState({ purchasable: count >= 1 });
  };

  //handle click on burger control less button
  removeIngredientHandler = ingredient => {
    let count = this.state.ingredients[ingredient];
    if (count <= 0) {
      return;
    }

    const newcount = count - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[ingredient] = newcount;
    const oldPrice = this.state.burgerPrice;
    const updatedPrice = oldPrice - INGREDIENT_PRICE[ingredient];
    this.setState({
      ingredients: updatedIngredients,
      burgerPrice: updatedPrice
    });
    this.updatePurchasable(updatedIngredients);
  };

  //handle click on burger control more button
  addIngredientHandler = ingredient => {
    let count = this.state.ingredients[ingredient];
    count++;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[ingredient] = count;
    const oldPrice = this.state.burgerPrice;
    const updatedPrice = oldPrice + INGREDIENT_PRICE[ingredient];
    this.setState({
      ingredients: updatedIngredients,
      burgerPrice: updatedPrice
    });
    this.updatePurchasable(updatedIngredients);
  };

  // order now button in burger control section
  ordernowBtn = () => {
    this.setState({ purchasing: true });
  };

  handleCancelOrder = () => {
    this.setState({ purchasing: false });
  };

  handleSaveOrder = () => {
    this.props.history.push({
      pathname: "/checkout",
      state: {
        ingredients: this.state.ingredients,
        price: this.state.burgerPrice
      }
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.burgerPrice}
        cancelOrder={this.handleCancelOrder}
        saveOrder={this.handleSaveOrder}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls
            ingredients={this.state.ingredients}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.burgerPrice}
            orderNow={this.ordernowBtn}
            purchasable={this.state.purchasable}
          />
        </Aux>
      );
    } else {
      burger = this.state.error ? "Error loading ingredients... " : <Spinner />;
    }

    return (
      <Aux>
        <Model show={this.state.purchasing}>{orderSummary}</Model>
        <Backdrop
          show={this.state.purchasing}
          cancelOrder={this.handleCancelOrder}
        />
        {burger}
      </Aux>
    );
  }
}

export default globalErrorHandler(BurgerBuilder, axios);
