import React, { useState } from "react";
import { Modal, Col } from "react-bootstrap";
import Video from "./Video/Video";
import Chat from "./Chat/Chat";

const ModalVideo = props => {
  const [show, setShow] = useState(true);
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState(false);
  const [showChat, setShowChat] = useState({
    display: "flex",
    col: 7
  });

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

  const handleChat = () => {
    if (showChat.display === "flex") {
      setShowChat({
        display: "none",
        col: 12
      });
    } else {
      setShowChat({
        display: "flex",
        col: 7
      });
    }
  };

  // ========================================================================

  const handleStatus = data => {
    setStatus(data);
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
          showChat={handleChat}
          status={handleStatus}
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
      className="modalCall"
    >
      <Modal.Body className="row" style={{ padding: "0px", margin: "0px" }}>
        <Col md={showChat.col} className="video">
          {handleOTSession()}
        </Col>

        <Col md={5} className="chat" style={{ display: showChat.display }}>
          <Chat
            session={session}
            username={props.username}
            username2={props.username2}
            img={props.img}
            status={status}
            roomDetails={props.roomDetails}
          />
        </Col>
      </Modal.Body>
    </Modal>
  );
};

export default ModalVideo;
