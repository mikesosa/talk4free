import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Video from "./Video/Video";
import axios from "axios";
import socketIOClient from "socket.io-client";

const ModalVideo = props => {
  const [show, setShow] = useState(true);

  /* ====================== decrease one user ============================*/
  const decreaseUserFromRoom = async roomId => {
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

  const handleClose = () => {
    // Delete one user from the room
    decreaseUserFromRoom(props.roomId);
    const socket = socketIOClient(`${process.env.REACT_APP_SOCKECT_URL}`);
    socket.emit("closeUserSignal", true);
    // Check if session is conected
    setShow(false);
    props.handleClose();
  };

  const handleOTSession = () => {
    if (show) {
      //If not published, make it published.
      return (
        <Video
          apiKey={process.env.REACT_APP_OPENTOK_API_KEY}
          sessionId={props.sessionId}
          token={props.token}
          roomId={props.roomId}
          onHangUp={handleClose}
          // onPublished={handlePublished}
          // onUpdate={props.onUpdate}
          // publisherVideo={publisherVideo}
        />
      );
    } else {
      // I do this to unmount the session so it can be disconnected
      return <p>Loading...</p>;
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Row>
        <Col md={8} className="video">
          {handleOTSession()}
        </Col>
        <Col md={4} className="chat">
          <Modal.Header>
            <Modal.Title>Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>Here we will have a cool chat!</Modal.Body>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalVideo;
