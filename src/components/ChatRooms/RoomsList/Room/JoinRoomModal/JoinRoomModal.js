import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import opentok from "../../../../../controllers/opentok";
import axios from "axios";

class JoinRoomModal extends React.Component {
  state = {
    joined: false,
    userId: null,
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
      url: "http://localhost:5000/api/users"
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

  onSubmit = async () => {
    console.log("Joining...");
    const user_token = await opentok.generateToken(this.props.sessionId);
    const user_id = await this.getUserId();
    console.log(user_id);
    // await saveSession(data, session_id, user_id);
    // const room_id = await getRoomId(session_id);
    // await addUserToRoom(room_id, user_id);
    // // Setting states
    // setSessionId(session_id);
    // setUserToken(user_token);
    // setUserId(user_id);
    // setRoomId(room_id);
    // setCompleted(true);

    this.setState({
      joined: true,
      userToken: user_token,
      userId: user_id
    });
  };

  render() {
    const handleRender = () => {
      if (this.state.joined) {
        return (
          <React.Fragment>
            <OTSession
              apiKey={process.env.REACT_APP_OPENTOK_API_KEY}
              sessionId={this.props.sessionId}
              token={this.state.userToken}
            >
              <OTPublisher />
              <OTStreams>
                <OTSubscriber />
              </OTStreams>
            </OTSession>
          </React.Fragment>
        );
      } else {
        return <p>Woohoo, you're aboout to join this call!</p>;
      }
    };
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <p>
              <Badge variant="warning">{this.props.lang}</Badge>
              {this.props.level}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{handleRender()}</Modal.Body>
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
  }
}

export default JoinRoomModal;
