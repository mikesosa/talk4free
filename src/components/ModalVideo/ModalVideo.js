import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Video from "./Video/Video";
import axios from "axios";

const ModalVideo = props => {
  const [show, setShow] = useState(true);
  const [published, setPublished] = useState(true);

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
    // Check if session is conected
    setPublished(false);
    setShow(false);
    props.handleClose();
  };
  // const handleShow = () => setShow(true);
  // const handleVideo = () => {
  //   console.log("handlinf vide0");
  //   setPublisherVideo(!publisherVideo);
  // };

  const handleOTSession = () => {
    if (published) {
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
