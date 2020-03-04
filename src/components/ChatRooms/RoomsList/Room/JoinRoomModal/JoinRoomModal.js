import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";

class JoinRoomModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <p>
              <Badge variant="warning">{this.props.lang}</Badge>
              {this.props.level}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're aboout to join this call!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.props.handleClose}>
            Join Call
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default JoinRoomModal;
