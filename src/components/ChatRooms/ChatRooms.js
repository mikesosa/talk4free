import React from "react";
import { Container, Button } from "react-bootstrap";
import CreateRoomModal from "./CreateRoomModal/CreateRoomModal";
import RoomsList from "./RoomsList/RoomsList";
import socketIOClient from "socket.io-client";
import { Rooms } from "../../controllers/ApiRequests";

class ChatRooms extends React.Component {
  state = {
    rooms: "",
    showCreateRoomModal: false
  };

  getRooms = async () => {
    // console.log(this.state.rooms);
    let res = await Rooms();
    this.setState({
      rooms: res,
      fetched: true
    });
  };

  componentDidMount() {
    const socket = socketIOClient(`${process.env.REACT_APP_SOCKECT_URL}`);
    socket.on("connect", () => {
      this.getRooms();
    });
    // remove room from all users
    socket.on("closeRoomResp", resp => {
      if (resp) this.getRooms();
    });
    // create room for all users
    socket.on("renderRoom", resp => {
      if (resp) this.getRooms();
    });
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
        return (
          <RoomsList
            rooms={this.state.rooms}
            isLoggedIn={this.props.isLoggedIn}
            email={this.props.email}
            users={this.props.users}
            onUpdate={this.getRooms}
          />
        );
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
              Create a Room
            </Button>
            <CreateRoomModal
              show={this.state.showCreateRoomModal}
              handleClose={this.createRoom}
              email={this.props.email}
              username={this.props.username}
              img={this.props.img}
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
