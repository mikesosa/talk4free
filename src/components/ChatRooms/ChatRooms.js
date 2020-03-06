import React from "react";
import { Container, Button } from "react-bootstrap";
// import apiTest from "../../apiTest";
import CreateRoomModal from "./CreateRoomModal/CreateRoomModal";
import RoomsList from "./RoomsList/RoomsList";
import axios from "axios";

class ChatRooms extends React.Component {
  state = {
    rooms: "",
    showCreateRoomModal: false
  };

  getRooms = () => {
    axios({
      method: "GET",
      headers: {
        token: process.env.REACT_APP_ZAFRA_KEY
      },
      url: "http://localhost:5000/api/rooms"
    })
      .then(res => {
        this.setState({
          rooms: res,
          fetched: true
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getRooms();
  }

  createRoom = () => {
    // Check if user is logged

    if (this.props.isLoggedIn) {
      // If logged show modal
      this.setState({
        showCreateRoomModal: !this.state.showCreateRoomModal
      });
    } else {
      alert("Please Sing In");
    }
  };

  render() {
    const fetchRooms = () => {
      // If there are rooms render roomslist if not... show a message
      if (
        typeof this.state.rooms === "object" &&
        Object.keys(this.state.rooms.data).length > 0
      ) {
        return <RoomsList rooms={this.state.rooms} />;
      } else {
        return (
          <p className="text-center">No rooms available, please create one!</p>
        );
      }
    };
    return (
      <section>
        <Container>
          <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 className="display-4">Chat Rooms</h1>
            <p className="lead">
              Quickly build an effective pricing table for your potential
              customers with this Bootstrap example. It’s built with default
              Bootstrap components and utilities with little customization.
            </p>
            <Button variant="primary" onClick={this.createRoom}>
              Create Room
            </Button>
            <CreateRoomModal
              show={this.state.showCreateRoomModal}
              handleClose={this.createRoom}
              email={this.props.email}
              onUpdate={this.getRooms}
            />
          </div>
          {fetchRooms()}
        </Container>
      </section>
    );
  }
}

export default ChatRooms;
