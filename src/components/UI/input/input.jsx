import React from "react";
import classes from "./input.css";

const Input = props => {
  let element;
  let errorClass = "";
  if (props.error && props.touched) {
    errorClass = classes.error;
  }
  switch (props.elementtype) {
    case "input":
      element = (
        <input
          {...props.config}
          value={props.value}
          onChange={props.changed}
          className={errorClass}
        />
      );
      break;
    case "textarea":
      element = (
        <textarea
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "dropdown":
      element = (
        <select value={props.value} onChange={props.changed}>
          {props.config.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displaytext}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      element = (
        <input
          type="text"
          {...props.config}
          value={props.value}
          onChange={props.chaned}
        />
      );
  }
  return (
    <div className={classes.formcontrol}>
      <label>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
