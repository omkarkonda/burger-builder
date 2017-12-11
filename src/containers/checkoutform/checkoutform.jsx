import React, { Component } from "react";
import classes from "./checkoutform.css";
import Spinner from "../../components/UI/spinner/spinner";
import Input from "../../components/UI/input/input";
import axios from "../../axios-orders";

class checkoutForm extends Component {
  state = {
    loading: false,
    formIsValid: false,
    orderfrom: {
      name: {
        elementtype: "input", // html tag name
        elementConfig: {
          type: "text",
          placeholder: "Full Name",
          name: "name",
          id: "name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementtype: "input", // html tag name
        elementConfig: {
          type: "text",
          placeholder: "Street Name",
          name: "street",
          id: "street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementtype: "input", // html tag name
        elementConfig: {
          type: "email",
          placeholder: "Email ID",
          name: "email",
          id: "email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      phone: {
        elementtype: "input", // html tag name
        elementConfig: {
          type: "text",
          placeholder: "Mobile Number",
          name: "mobileNumber",
          id: "mobileNumber"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementtype: "input", // html tag name
        elementConfig: {
          type: "number",
          placeholder: "Zipcode",
          name: "zip",
          id: "zip"
        },
        value: "",
        validation: {
          required: true,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementtype: "dropdown", // html tag name
        elementConfig: {
          options: [
            { value: "fastest", displaytext: "Fastest" },
            { value: "cheapest", displaytext: "Cheapest" }
          ]
        },
        validation: {},
        value: "fastest",
        valid: true
      }
    }
  };

  cancel = () => this.props.history.push("/");

  checkValidity = (value, validationRules) => {
    let isValid = true;
    if (validationRules.required) {
      isValid = value.trim().length > 0 && isValid;
    }
    if (validationRules.maxLength) {
      isValid = value.length >= validationRules.maxLength && isValid;
    }
    if (validationRules.maxLength) {
      isValid = value.length <= validationRules.maxLength && isValid;
    }
    return isValid;
  };

  inputChangeHandler = (event, inputElement) => {
    let updatedOrderform = {
      ...this.state.orderfrom
    };
    let updatedInputElement = {
      ...updatedOrderform[inputElement]
    };
    updatedInputElement.value = event.target.value;
    updatedInputElement.touched = true;
    updatedInputElement.valid = this.checkValidity(
      updatedInputElement.value,
      updatedInputElement.validation
    );
    updatedOrderform[inputElement] = updatedInputElement;

    let formIsValid = true;
    for (let key in updatedOrderform) {
      formIsValid = updatedOrderform[key].valid && formIsValid;
    }
    this.setState({ orderfrom: updatedOrderform, formIsValid });
  };

  submitHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });

    const contactDetails = {};

    for (let key in this.state.orderfrom) {
      if (key === "deliveryMethod") continue;
      contactDetails[key] = this.state.orderfrom[key].value;
    }

    const order = {
      customer: contactDetails,
      ingredients: this.props.ingredients,
      price: this.props.price,
      deliveryMethod: this.state.orderfrom["deliveryMethod"].value
    };

    axios.post("/orders.json", order).then(
      response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      },
      error => {
        this.setState({ loading: false });
      }
    );
  };

  render() {
    let formFields = [];
    for (let key in this.state.orderfrom) {
      formFields.push({
        id: key,
        config: this.state.orderfrom[key]
      });
    }

    let form = (
      <form onSubmit={this.submitHandler}>
        {formFields.map(el => {
          return (
            <Input
              key={el.id}
              config={el.config.elementConfig}
              elementtype={el.config.elementtype}
              value={el.config.value}
              changed={event => this.inputChangeHandler(event, el.id)}
              error={!el.config.valid}
              touched={el.config.touched}
            />
          );
        })}
        <div className={classes.orderBtnWrapper}>
          <button
            disabled={!this.state.formIsValid}
            className={classes.continue}
            onClick={this.submitHandler}
            type="button"
          >
            ORDER BURGER
          </button>
          <button
            className={classes.cancel}
            onClick={this.cancel}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.checkoutform}>{form}</div>;
  }
}

export default checkoutForm;
