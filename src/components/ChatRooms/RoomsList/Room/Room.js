import React from "react";
// import ParticipantsList from "./ParticipantsList/ParticipantsList";
import JoinRoomModal from "./JoinRoomModal/JoinRoomModal";
import { Row, Col, Button, Badge } from "react-bootstrap";


class Room extends React.Component {
  state = {
    showModal: false
  };

  showCreateRoomModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    return (
      <Col className="text-center room-box">
        <Row className="room-box-header">
          <p>
            <Badge variant="warning">{this.props.room.lang}</Badge>
            {this.props.room.lvl}
          </p>
        </Row>
        <Row className="room-box-body">
          {/* <ParticipantsList participants={this.props.room.max_user} /> */}
        </Row>
        <Row className="room-box-footer">
          <Button variant="primary" onClick={this.showCreateRoomModal}>
            <i className="material-icons">perm_phone_msg</i>Join now!
          </Button>
          <JoinRoomModal
            show={this.state.showModal}
            handleClose={this.showCreateRoomModal}
            lang={this.props.room.lang}
            level={this.props.room.lvl}
          />
        </Row>
      </Col>
    );
  }
}

export default Room;
