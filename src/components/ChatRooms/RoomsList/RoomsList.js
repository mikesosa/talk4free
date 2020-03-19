import React from "react";
import Room from "./Room/Room";
import { Row } from "react-bootstrap";

class RoomsList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row className="roomsList">
          {this.props.rooms[0].data.map((room, index) => {
            const users = this.props.users.filter(
              user => user.room_id === room.id
            );
            return (
              <Room
                key={index}
                room={room}
                users={users}
                email={this.props.email}
                username={this.props.username}
                img={this.props.img}
                isLoggedIn={this.props.isLoggedIn}
                onUpdate={this.props.onUpdate}
                socket={this.props.socket}
              />
            );
          })}
        </Row>
      </React.Fragment>
    );
  }
}

export default RoomsList;
