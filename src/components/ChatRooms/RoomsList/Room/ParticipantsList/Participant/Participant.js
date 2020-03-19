import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Participant(props) {
  const { participant } = props;

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip-top`}>
          <strong>{participant.username}</strong>
        </Tooltip>
      }
    >
      <div
        className="participant"
        style={{ backgroundImage: `url(${participant.img})` }}
      ></div>
    </OverlayTrigger>
  );
}

export default Participant;
