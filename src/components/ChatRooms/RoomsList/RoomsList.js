import React from "react";
import Room from "./Room/Room";
import { Row } from "react-bootstrap";

class RoomsList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row className="justify-content-between">
          {this.props.rooms.data.map((room, index) => {
            const users = this.props.users.filter(
              user => user.room_id === room.id
            );
            return (
              <Room
                key={index}
                room={room}
                users={users}
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
