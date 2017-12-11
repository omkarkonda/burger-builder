import React from "react";
import Aux from "../../hoc/auxt";

const layout = props => {
  return (
    <Aux>
      <main>{props.children}</main>
    </Aux>
  );
};

export default layout;
