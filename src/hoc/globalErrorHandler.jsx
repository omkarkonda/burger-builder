import React, { Component } from "react";
import Aux from "./auxt";
import Model from "../components/UI/model/model";
import Backdrop from "../components/UI/backdrop/backdrop";

const globalErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: null };

    componentWillMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error.message });
          console.log(error);
        }
      );
    }
    render() {
      return (
        <Aux>
          <Model show={this.state.error}>
            {this.state.error} !! Please Try after sometime.
          </Model>
          <Backdrop show={this.state.error} />
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default globalErrorHandler;
