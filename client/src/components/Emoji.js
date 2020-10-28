import React from "react";

const Emoji = (props) => (
  // eslint-disable-next-line
  <span
    className="emoji"
    role="img"
    aria-level={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
);

export default Emoji;
