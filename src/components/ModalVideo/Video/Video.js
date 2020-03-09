import React from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import axios from "axios";
import "./Video.scss";

export default class Video extends React.Component {
  state = {
    apiKey: this.props.apiKey,
    sessionId: this.props.sessionId,
    token: this.props.token
    // streamCreated: false
  };

  publisherProperties = {
    audioFallbackEnabled: false,
    showControls: false
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

  publisherEventHandlers = {
    streamCreated: event => {
      this.props.onPublished(true);
      console.log("Publisher stream created!");
    },
    streamDestroyed: async event => {
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
        <OTStreams>
          <OTSubscriber />
        </OTStreams>
      </OTSession>
    );
  }
}
