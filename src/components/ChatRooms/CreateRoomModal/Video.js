import React from "react";
import { OTSession, OTPublisher } from "opentok-react";
import axios from "axios";

export default class Video extends React.Component {
  state = {
    apiKey: this.props.apiKey,
    sessionId: this.props.sessionId,
    token: this.props.token
  };

  publisherProperties = {
    audioFallbackEnabled: false,
    showControls: false
  };

  /* ====================== decrease one user ============================*/
  decreaseUserFromRoom = async roomId => {
    const url = `https://talk4free.live/api/rooms/decrease/${roomId}`;
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

  publisherEventHandlers = {
    streamCreated: event => {
      console.log("Publisher stream created!");
    },
    streamDestroyed: async event => {
      // console.log(this.props);
      await this.decreaseUserFromRoom(this.props.roomId);
      this.props.onUpdate();
      console.log("Publisher stream destroyed!");
    }
  };

  render() {
    return (
      <OTSession
        apiKey={this.state.apiKey}
        sessionId={this.state.sessionId}
        token={this.state.token}
      >
        <OTPublisher
          properties={this.publisherProperties}
          eventHandlers={this.publisherEventHandlers}
        />
      </OTSession>
    );
  }
}
