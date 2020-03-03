import React from "react";
import { Container, Button } from "react-bootstrap";
import apiTest from "../../apiTest";
import RoomsList from "./RoomsList/RoomsList";
import CreateSession from "../../controllers/CreateSession";
import opentok from "../../controllers/opentok";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";

class ChatRooms extends React.Component {
  state = {
    session_id: "",
    user_token: ""
  };
  // Creates the user token
  createToken = async () => {
    // const token = opentok.generateToken(this.state.session_id);
    // this.setState({ user_token: token });
    let user_token = new Promise(resolve => {
      let res = opentok.generateToken(this.state.session_id);
      resolve(res);
    });
    user_token.then(res => {
      this.setState({ user_token: res });
    });
  };
  // Creates the sessionid
  createSession = () => {
    let session_id = new Promise(resolve => {
      let res = CreateSession();
      resolve(res);
    });
    session_id.then(res => {
      this.setState({ session_id: res });
      this.createToken();
    });
  };
  render() {
    const checkRooms = () => {
      if (!this.state.user_token) {
        return <RoomsList rooms={apiTest.rooms} />;
      } else {
        console.log(process.env.REACT_APP_OPENTOK_API_KEY);
        console.log(this.state.session_id);
        console.log(this.state.user_token);
        return (
          <React.Fragment>
            <OTSession
              apiKey={process.env.REACT_APP_OPENTOK_API_KEY}
              sessionId={this.state.session_id}
              token={this.state.user_token}
            >
              <OTPublisher />
              <OTStreams>
                <OTSubscriber />
              </OTStreams>
            </OTSession>
            <Button>Connect</Button>
          </React.Fragment>
        );
      }
    };
    return (
      <section>
        <Container>
          <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 className="display-4">Chat Rooms</h1>
            <p className="lead">
              Quickly build an effective pricing table for your potential
              customers with this Bootstrap example. It’s built with default
              Bootstrap components and utilities with little customization.
            </p>
            <Button
              variant="primary"
              className="ml-5"
              onClick={this.createSession}
            >
              Create Room
            </Button>
          </div>
          {checkRooms()}
        </Container>
      </section>
    );
  }
}

export default ChatRooms;
