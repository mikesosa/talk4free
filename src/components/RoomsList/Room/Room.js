import React from "react";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
import { Row, Col, Button, Badge } from "react-bootstrap";

class Room extends React.Component {
  render() {
    return (
      <Col className="text-center room-box">
        <Row className="room-box-header">
          <p>
            <Badge variant="warning">{this.props.room.language}</Badge>
            {this.props.room.languageLevel}
          </p>
        </Row>
        <Row className="room-box-body">
          <ParticipantsList participants={this.props.room.participants} />
        </Row>
        <Row className="room-box-footer">
          <Button variant="primary">
            <i className="material-icons">perm_phone_msg</i>Join now!
          </Button>
        </Row>
      </Col>
    );
  }
}

export default Room;
