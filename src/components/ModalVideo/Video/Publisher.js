import React from "react";
import { OTPublisher } from "opentok-react";
import { Button } from "react-bootstrap";
import CheckBox from "./CheckBox";
import { FaPhone } from "react-icons/fa";

class Publisher extends React.Component {
  state = {
    error: null,
    audio: true,
    video: false,
    videoSource: "camera"
  };

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

  onError = err => {
    this.setState({ error: `Failed to publish: ${err.message}` });
  };
  //   setAudio()
  //   setVideo()
  //   setVideoSource()
  //   onError()

  render() {
    return (
      <div className="publisher">
        Publisher
        {this.state.error ? <div id="error">{this.state.error}</div> : null}
        <OTPublisher
          properties={{
            // insertDefaultUI: false,
            style: {
              audioLevelDisplayMode: "on",
              buttonDisplayMode: "off"
            },
            publishAudio: this.state.audio,
            publishVideo: this.state.video,
            videoSource:
              this.state.videoSource === "screen" ? "screen" : undefined
          }}
          onError={this.onError}
        />
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
      </div>
    );
  }
}

export default Publisher;
