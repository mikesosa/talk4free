import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Languages from "../../../languages";

class CreateRoomModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Language</Form.Label>
                <Form.Control as="select">
                  <option>Choose a language...</option>
                  {Languages.map((lang, index) => {
                    return <option key={index}>{lang}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Level</Form.Label>
                <Form.Control as="select">
                  <option>Choose...</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Max People</Form.Label>
                <Form.Control as="select">
                  <option>Choose...</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.props.handleClose}>
            Create and Join
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateRoomModal;
