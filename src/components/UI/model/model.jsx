import React, { Component } from "react";
import classes from "./model.css";

class model extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <div
        className={classes.model}
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: this.props.show ? "1" : "0"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default model;
