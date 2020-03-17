import React from "react";
import { FaCircle } from "react-icons/fa";

class ConnectionStatus extends React.Component {
  render() {
    let status = this.props.connected ? "Online" : "Offline";
    let color = this.props.connected ? "#48bf84" : "red";

    return (
      <p style={{ margin: "0px" }}>
        <strong>{status}</strong> <FaCircle style={{ color: color }} />
      </p>
    );
  }
}
export default ConnectionStatus;
