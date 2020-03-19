import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import ModalVideo from "../../../../ModalVideo/ModalVideo";
import opentok from "../../../../../controllers/opentok";
import {
  UserId,
  addUserToRoom,
  // removeUserFromRoom,
  getRoomId,
  increaseUserFromRoom,
  joinInRoomId
} from "../../../../../controllers/ApiRequests";

class JoinRoomModal extends React.Component {
  state = {
    joined: false,
    userId: null,
    roomId: null,
    userToken: null,
    roomDetails: {
      lang: this.props.lang,
      level: this.props.level,
      maxPeople: this.props.maxPeople
    }
  };

  // ========================================================================

  onSubmit = async () => {
    // verify if user can join
    const user_id = await UserId(this.props.email);
    const roomId = await getRoomId(this.props.sessionId);
    // const is_able = await joinInRoomId(roomId);
    // if (is_able) {
    console.log("Joining...");
    const user_token = await opentok.generateToken(this.props.sessionId);
    await addUserToRoom(roomId, user_id);
    await increaseUserFromRoom(roomId);

    this.setState({
      joined: true,
      userToken: user_token,
      userId: user_id,
      roomId: roomId
    });

    this.props.socket.emit("renderRooms", true);
    // }
  };

  // ========================================================================

  handleClose = async () => {
    this.setState({
      joined: false,
      userId: null,
      roomId: null,
      userToken: null
    });
    this.props.handleClose();
    // this.props.socket.emit("renderRooms", true);
  };

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      console.log("qpsa", this.props.show);
    }
  }

  // ========================================================================

  render() {
    if (!this.state.joined) {
      return (
        <Modal show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <p>
                <Badge variant="warning">{this.props.lang}</Badge>
                {this.props.level}
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Woohoo, you're aboout to join this call!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.onSubmit}>
              Join Call
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return (
        <ModalVideo
          show={true}
          sessionId={this.props.sessionId}
          token={this.state.userToken}
          roomId={this.state.roomId}
          userId={this.state.userId}
          onUpdate={this.props.onUpdate}
          handleClose={this.handleClose}
          email={this.props.email}
          username2={this.props.username}
          img={this.props.img}
          socket={this.props.socket}
          roomDetails={this.state.roomDetails}
        />
      );
    }
  }
}

export default JoinRoomModal;
