import React from "react";
// import ParticipantsList from "./ParticipantsList/ParticipantsList";
import JoinRoomModal from "./JoinRoomModal/JoinRoomModal";
import { Row, Col, Button, Badge } from "react-bootstrap";
// import CreateSession from "../../controllers/CreateSession";
// import opentok from "../../controllers/opentok";
// import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";

class Room extends React.Component {
  state = {
    showModal: false
  };
  //   state = {
  //     session_id: "",
  //     user_token: ""
  //   };
  //   // Creates the user token
  //   createToken = async () => {
  //     const token = opentok.generateToken(this.state.session_id);
  //     this.setState({ user_token: token });
  //   };
  //   // Creates the sessionid
  //   createSession = () => {
  //     let session_id = new Promise(resolve => {
  //       let res = CreateSession();
  //       resolve(res);
  //     });
  //     session_id.then(res => {
  //       this.setState({ session_id: res });
  //       this.createToken();
  //     });
  //   };
  //   <React.Fragment>
  //   <OTSession
  //     apiKey={process.env.REACT_APP_OPENTOK_API_KEY}
  //     sessionId={this.state.session_id}
  //     token={this.state.user_token}
  //   >
  //     <OTPublisher />
  //     <OTStreams>
  //       <OTSubscriber />
  //     </OTStreams>
  //   </OTSession>
  //   <Button>Connect</Button>
  // </React.Fragment>

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
