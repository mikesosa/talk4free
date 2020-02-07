import React from "react";

class Participant extends React.Component {
  render() {
    const { participant } = this.props;
    const style = {
      backgroundImage: `url(${participant.profilePicture})`
    };
    return <div className="participant" style={style}></div>;
  }
}

export default Participant;
