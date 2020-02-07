import React from "react";
import Room from "./Room/Room";
import { Row } from "react-bootstrap";

class RoomsList extends React.Component {
  render() {
    return (
      <Row className="justify-content-between">
        {this.props.rooms.map((room, index) => {
          return <Room key={index} room={room} />;
        })}
      </Row>
    );
  }
}

export default RoomsList;