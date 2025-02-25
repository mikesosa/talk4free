import React from "react";
import Publisher from "./Publisher";
import CheckBox from "./CheckBox";
import { Button } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import { OTSession, OTStreams, OTSubscriber } from "opentok-react";
import "./Video.scss";
import {
  removeUserFromRoom,
  decreaseUserFromRoom
} from "../../../controllers/ApiRequests";

// ========================================================================

export default class Video extends React.Component {
  state = {
    error: null,
    connected: false,
    apiKey: this.props.apiKey,
    sessionId: this.props.sessionId,
    token: this.props.token,
    userId: this.props.userId,
    roomId: this.props.roomId,
    // Child Components
    audio: true,
    video: false,
    videoSource: "camera",
    otSession: React.createRef()
  };

  // ========================================================================

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

  // ========================================================================

  onError = err => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  };

  // ========================================================================

  componentCleanup = () => {
    removeUserFromRoom(this.state.roomId, this.state.userId);
    decreaseUserFromRoom(this.state.roomId);
    this.props.socket.emit("renderRooms", true);
  };

  // ========================================================================

  componentDidMount() {
    this.props.session(this.state.otSession);
    window.addEventListener("beforeunload", this.componentCleanup);
  }

  // ========================================================================

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
  }

  // ========================================================================

  setAudio = audio => {
    this.setState({ audio });
  };

  // ========================================================================

  setVideo = video => {
    this.setState({ video });
  };

  // ========================================================================

  changeVideoSource = videoSource => {
    this.state.videoSource !== "camera"
      ? this.setState({ videoSource: "camera" })
      : this.setState({ videoSource: "screen" });
  };

  // ========================================================================

  render() {
    this.props.status(this.state.connected);
    return (
      <React.Fragment>
        <OTSession
          ref={this.state.otSession}
          apiKey={this.props.apiKey}
          sessionId={this.props.sessionId}
          token={this.props.token}
          eventHandlers={this.sessionEvents}
          onError={this.onError}
          style={{ diplay: "flex", flexDirection: "column" }}
        >
          {this.state.error ? <div id="error">{this.state.error}</div> : null}
          <div className="publisher">
            <Publisher
              error={this.state.error}
              audio={this.state.audio}
              video={this.state.video}
              videoSource={this.state.videoSource}
              email={this.props.email}
              username={
                this.props.username ? this.props.username : this.props.username2
              }
              img={this.props.img}
            />
            <OTStreams>
              <OTSubscriber
                properties={{
                  width: "100%",
                  style: {
                    audioLevelDisplayMode: "on",
                    buttonDisplayMode: "off",
                    nameDisplayMode: "on",
                    backgroundImageURI: this.props.imgUrl
                  },
                  inserMode: "before"
                }}
              />
            </OTStreams>
          </div>
        </OTSession>
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
          <CheckBox
            label="Chat"
            initialChecked={true}
            onChange={this.props.showChat}
          />
          <Button className="hangupIcon" onClick={this.props.onHangUp}>
            <FaPhone />
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
