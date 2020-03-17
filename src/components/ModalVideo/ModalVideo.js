import React, { useState } from "react";
import { Modal, Col } from "react-bootstrap";
import Video from "./Video/Video";
import Chat from "./Chat/Chat";

const ModalVideo = props => {
  const [show, setShow] = useState(true);
  const [session, setSession] = useState(null);

  // ========================================================================

  const handleClose = () => {
    setShow(false);
    props.handleClose();
  };

  // ========================================================================

  const handleSession = data => {
    setSession(data);
  };

  // ========================================================================

  const handleOTSession = () => {
    if (show) {
      // If not published, make it published.
      return (
        <Video
          apiKey={process.env.REACT_APP_OPENTOK_API_KEY}
          sessionId={props.sessionId}
          token={props.token}
          roomId={props.roomId}
          userId={props.userId}
          onHangUp={handleClose}
          email={props.email}
          username={props.username}
          username2={props.username2}
          img={props.img}
          session={handleSession}
          socket={props.socket}
        />
      );
    } else {
      // I do this to unmount the session so it can be disconnected
      return <p>Loading...</p>;
    }
  };

  // ========================================================================

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="row" style={{ padding: "0px", margin: "0px" }}>
        <Col md={7} className="video">
          {handleOTSession()}
        </Col>
        <Col md={5} className="chat">
          <Chat
            session={session}
            username={props.username}
            username2={props.username2}
            img={props.img}
          />
        </Col>
      </Modal.Body>
    </Modal>
  );
};

export default ModalVideo;
