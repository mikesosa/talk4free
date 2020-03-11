import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import ModalVideo from "../../../../ModalVideo/ModalVideo";
import opentok from "../../../../../controllers/opentok";
import axios from "axios";
import socketIOClient from "socket.io-client";

class JoinRoomModal extends React.Component {
  state = {
    joined: false,
    userId: null,
    roomId: null,
    userToken: null
  };

  /* ==================================== FUNCTIONS ============================================*/

  // =============== Get user Id ==============================
  getUserId = async () => {
    const result = await axios({
      method: "GET",
      headers: {
        token: process.env.REACT_APP_ZAFRA_KEY
      },
      url: `${process.env.REACT_APP_API_URL}/api/users`
    });

    const users = result.data;
    if (users.length > 0) {
      for (let index = 0; index < users.length; index++) {
        if (users[index].email === this.props.email) {
          return users[index].id;
        }
      }
    }
    return null;
  };

  // ====================== Add User to Room =============================
  addUserToRoom = async (roomId, userId) => {
    let url = `${process.env.REACT_APP_API_URL}/api/users/join/${roomId}/${userId}`;
    try {
      await axios({
        method: "PUT",
        headers: {
          token: process.env.REACT_APP_ZAFRA_KEY
        },
        url: url
      });
      url = `${process.env.REACT_APP_API_URL}/api/rooms/increase/${roomId}`;
      await axios({
        method: "PUT",
        headers: {
          token: process.env.REACT_APP_ZAFRA_KEY
        },
        url: url
      });
    } catch (error) {
      console.log(error);
    }
    // This will update the rooms list on the frontend
    this.props.onUpdate();
  };

  // ===================== Remove User from Room ============================
  removeUserFromRoom = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/users/out/${this.state.roomId}/${this.state.userId}`;
    try {
      await axios({
        method: "PUT",
        headers: {
          token: process.env.REACT_APP_ZAFRA_KEY
        },
        url: url
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ====================== Decrease one user from Room =============================
  decreaseUserFromRoom = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/rooms/decrease/${this.state.roomId}`;
    try {
      await axios({
        method: "PUT",
        headers: {
          token: process.env.REACT_APP_ZAFRA_KEY
        },
        url: url
      });
    } catch (error) {
      console.log(error);
    }
    this.props.handleClose();
  };

  // ============= Get room Id ====================================
  getRoomId = async ss_id => {
    const result = await axios({
      method: "GET",
      headers: {
        token: process.env.REACT_APP_ZAFRA_KEY
      },
      url: `${process.env.REACT_APP_API_URL}/api/rooms`
    });
    const rooms = result.data;
    if (rooms.length > 0) {
      for (let index = 0; index < rooms.length; index++) {
        if (rooms[index].session_id === ss_id) {
          return rooms[index].id;
        }
      }
    }
    return null;
  };

  onSubmit = async () => {
    console.log("Joining...");
    const socket = socketIOClient(`${process.env.REACT_APP_SOCKECT_URL}`);
    const user_token = await opentok.generateToken(this.props.sessionId);
    const user_id = await this.getUserId();
    const roomId = await this.getRoomId(this.props.sessionId);
    await this.addUserToRoom(roomId, user_id);
    this.setState({
      joined: true,
      userToken: user_token,
      userId: user_id,
      roomId: roomId
    });
    socket.emit("closeUserSignal", true);
  };

  handleClose = async () => {
    // Do we need sockets??
    // await this.decreaseUserFromRoom();
    await this.removeUserFromRoom();
    this.props.handleClose();
  };
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
            <Button variant="secondary" onClick={this.props.handleClose}>
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
          onUpdate={this.props.onUpdate}
          handleClose={this.handleClose}
        />
      );
    }
  }
}

export default JoinRoomModal;
