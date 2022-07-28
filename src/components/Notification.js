import PropTypes from "prop-types";
import React from "react";

// export const Notification = ({ message, style }) => {
export const Notification = React.createRef((props) => {
  if (props.message === null) {
    return null;
  }
  return <div className={props.style}>{props.message}</div>;
});

Notification.displayName = "Notification";

Notification.propTypes = { message: PropTypes.string.isRequired };
