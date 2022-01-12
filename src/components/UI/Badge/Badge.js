import React from "react";
import classNames from "classnames";

import "./Badge.scss";

const Badge = ({ color, onSelectedColor, className }) => {
  return (
    <i
      onClick={onSelectedColor}
      className={classNames('badge', { [`badge--${color}`] : color}, className)}
    ></i>
  );
};

export default Badge;
