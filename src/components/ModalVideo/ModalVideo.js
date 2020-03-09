import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Video from "./Video/Video";

const ModalVideo = props => {
  const [show, setShow] = useState(true);
  const [published, setPublished] = useState(false);

  const handlePublished = value => setPublished(value);

  const handleClose = () => {
    // Check if session is conected
    if (published) {
      setShow(false);
    } else {
      console.log("No published yet, please wait");
    }
  };
  const handleShow = () => setShow(true);

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
          <Video
            apiKey={process.env.REACT_APP_OPENTOK_API_KEY}
            sessionId={props.sessionId}
            token={props.token}
            roomId={props.roomId}
            onPublished={handlePublished}
            onUpdate={props.onUpdate}
          />
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow}>
              Video
            </Button>
            <Button variant="secondary" onClick={handleShow}>
              Audio
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Hang Up
            </Button>
          </Modal.Footer>
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
