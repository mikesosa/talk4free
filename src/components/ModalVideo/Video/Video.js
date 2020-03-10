import React from "react";
import ConnectionStatus from "./ConnectionStatus";
import Publisher from "./Publisher";
// import Subscriber from "./Subscriber";
import CheckBox from "./CheckBox";
import { Button } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";

import { OTSession, OTStreams, OTSubscriber } from "opentok-react";
// import { Button } from "react-bootstrap";
import axios from "axios";
import "./Video.scss";

export default class Video extends React.Component {
  state = {
    error: null,
    connected: false,
    apiKey: this.props.apiKey,
    sessionId: this.props.sessionId,
    token: this.props.token,
    // Child Components
    audio: true,
    video: false,
    videoSource: "camera"
  };
  sessionEvents = {
    sessionConnected: () => {
      this.setState({ connected: true });
    },
    sessionDisconnected: () => {
      this.setState({ connected: false });
    },
    streamCreated: event => {
      console.log("Stream created!", event);
    },
    streamDestroyed: event => {
      console.log("Stream destroyed!", event);
    }
  };
  onError = err => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  };

  componentWillUnmount() {
    console.log("Session unmounted!");
  }

  setAudio = audio => {
    this.setState({ audio });
  };

  setVideo = video => {
    this.setState({ video });
  };

  changeVideoSource = videoSource => {
    this.state.videoSource !== "camera"
      ? this.setState({ videoSource: "camera" })
      : this.setState({ videoSource: "screen" });
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
          <Publisher
            error={this.state.error}
            audio={this.state.audio}
            video={this.state.video}
            videoSource={this.state.videoSource}
          />
          <OTStreams>
            {/* <Subscriber
              error={this.state.error}
              audio={this.state.audio}
              video={this.state.video}
              videoSource={this.state.videoSource}
            /> */}
            <OTSubscriber />
          </OTStreams>

          {/* Take out the buttons so they will be only for one component */}
          <div className="controls">
            <CheckBox label="Screen" onChange={this.changeVideoSource} />
            <CheckBox
              label="Audio"
              initialChecked={this.state.audio}
              onChange={this.setAudio}
            />
            <CheckBox
              label="Video"
              initialChecked={this.state.video}
              onChange={this.setVideo}
            />
            <Button onClick={this.props.onHangUp}>
              <FaPhone />
            </Button>
          </div>
        </OTSession>
      </React.Fragment>
    );
  }
}
