import React from "react";
import { OTSession, OTPublisher } from "opentok-react";

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

  publisherEventHandlers = {
    streamCreated: event => {
      console.log("Publisher stream created!");
    },
    streamDestroyed: event => {
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
