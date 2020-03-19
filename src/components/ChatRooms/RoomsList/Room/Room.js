import React from "react";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
import JoinRoomModal from "./JoinRoomModal/JoinRoomModal";
import { Row, Col, Button, Badge } from "react-bootstrap";
import "./Room.scss";

class Room extends React.Component {
  state = {
    showModal: false,
    flag: require(`../../../../img/${this.props.room.lang}.png`)
  };

  showJoinRoomModal = () => {
    if (this.props.isLoggedIn) {
      if (this.props.room.active_users < this.props.room.max_user) {
        this.setState({
          showModal: true
        });
      }
    } else {
      alert("Please sign in");
    }
  };

  handleClose = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <Col md={3} sm={6} className="text-center room-box">
          <Row className="room-box-header">
            <p>
              <Badge
                variant="warning"
                style={{
                  paddingRight: "2.5rem",
                  backgroundImage: `url(${this.state.flag})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "22px",
                  backgroundPosition: "90% 4px"
                }}
              >
                {this.props.room.lang}
              </Badge>
              {this.props.room.lvl}
            </p>
          </Row>
          <Row className="room-box-body">
            <ParticipantsList participants={this.props.users} />
          </Row>
          <Row className="room-box-footer">
            <Button
              variant={
                this.props.room.active_users < this.props.room.max_user
                  ? "primary"
                  : "disabled"
              }
              onClick={this.showJoinRoomModal}
            >
              {this.props.room.active_users < this.props.room.max_user
                ? "Join Now!"
                : "Room is Full"}
            </Button>
          </Row>
        </Col>
        <JoinRoomModal
          show={this.state.showModal}
          handleClose={this.handleClose}
          lang={this.props.room.lang}
          level={this.props.room.lvl}
          sessionId={this.props.room.session_id}
          email={this.props.email}
          username={this.props.username}
          img={this.props.img}
          onUpdate={this.props.onUpdate}
          socket={this.props.socket}
          maxPeople={this.props.room.max_user}
        />
      </React.Fragment>
    );
  }
}

export default Room;
