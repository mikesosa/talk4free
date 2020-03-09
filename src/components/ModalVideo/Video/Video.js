import React from "react";
import ConnectionStatus from "./ConnectionStatus";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import { OTSession, OTStreams } from "opentok-react";
// import { Button } from "react-bootstrap";
import axios from "axios";
import "./Video.scss";

export default class Video extends React.Component {
  state = {
    error: null,
    connected: false,
    apiKey: this.props.apiKey,
    sessionId: this.props.sessionId,
    token: this.props.token
  };
  sessionEvents = {
    sessionConnected: () => {
      this.setState({ connected: true });
    },
    sessionDisconnected: () => {
      this.setState({ connected: false });
    }
  };
  onError = err => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  };

  /* ====================== decrease one user ============================*/
  decreaseUserFromRoom = async roomId => {
    const url = `${process.env.REACT_APP_API_URL}/api/rooms/decrease/${roomId}`;
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

  render() {
    return (
      <React.Fragment>
        <OTSession
          apiKey={this.props.apiKey}
          sessionId={this.props.sessionId}
          token={this.props.token}
          eventHandlers={this.sessionEvents}
          onError={this.onError}
        >
          {this.state.error ? <div id="error">{this.state.error}</div> : null}
          <ConnectionStatus connected={this.state.connected} />
          <Publisher />
          <OTStreams>
            <Subscriber />
          </OTStreams>
        </OTSession>
      </React.Fragment>
    );
  }
}
