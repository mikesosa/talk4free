import React from "react";
import Room from "./Room/Room";
import { Row } from "react-bootstrap";

class RoomsList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row className="justify-content-between">
          {this.props.rooms.data.map((room, index) => {
            return (
              <Room
                key={index}
                room={room}
                isLoggedIn={this.props.isLoggedIn}
                email={this.props.email}
              />
            );
          })}
        </Row>
      </React.Fragment>
    );
  }
}

export default RoomsList;
