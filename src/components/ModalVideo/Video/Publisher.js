import React from "react";
import { OTPublisher } from "opentok-react";
// import { Button } from "react-bootstrap";
// import CheckBox from "./CheckBox";
// import { FaPhone } from "react-icons/fa";

class Publisher extends React.Component {
  state = {
    error: null
  };

  onError = err => {
    this.setState({ error: `Failed to publish: ${err.message}` });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.error ? <div id="error">{this.props.error}</div> : null}
        <OTPublisher
          properties={{
            name: this.props.username,
            width: "100%",
            height: "20rem",
            style: {
              audioLevelDisplayMode: "on",
              buttonDisplayMode: "off",
              nameDisplayMode: "on"
            },
            publishAudio: this.props.audio,
            publishVideo: this.props.video,
            videoSource:
              this.props.videoSource === "screen" ? "screen" : undefined
          }}
          onError={this.onError}
        />
        {/* <div className="controls">
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
        </div> */}
      </React.Fragment>
    );
  }
}

export default Publisher;
