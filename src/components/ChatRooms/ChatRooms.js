import React from "react";
import "./ChatRooms.scss";
import { Container, Button } from "react-bootstrap";
import CreateRoomModal from "./CreateRoomModal/CreateRoomModal";
import RoomsList from "./RoomsList/RoomsList";
import { FaPlus } from "react-icons/fa";

class ChatRooms extends React.Component {
  state = {
    rooms: this.props.rooms,
    showCreateRoomModal: false
  };

  // ========================================================================

  componentDidMount() {
    this.setState({
      rooms: this.props.rooms
    });
  }

  // ========================================================================

  componentDidUpdate(prevProps) {
    if (this.props.rooms !== prevProps.rooms) {
      this.setState({
        rooms: this.props.rooms
      });
    }
  }

  // ========================================================================

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

  // ========================================================================

  render() {
    const fetchRooms = () => {
      if (this.state.rooms[0] && this.state.rooms[0].data.length > 0) {
        return (
          <RoomsList
            rooms={this.state.rooms}
            isLoggedIn={this.props.isLoggedIn}
            email={this.props.email}
            username={this.props.username}
            img={this.props.img}
            users={this.props.users}
            socket={this.props.socket}
          />
        );
      } else {
        return (
          <p className="text-center">No rooms available, please create one!</p>
        );
      }
    };

    // ========================================================================

    return (
      <section>
        <Container>
          <div className="chatRooms">
            <h1 className="display-4">Chat Rooms</h1>
            <p className="lead">
              Here you can Join or Create a Room. Just setup the language and
              the limit of participants you want to allow in you conversation.
              Rembember not to share banned content{" "}
              <a href="#Sdsd">more details</a>
            </p>
            <Button variant="primary" onClick={this.createRoom}>
              Create a Room <FaPlus />
            </Button>
            <CreateRoomModal
              show={this.state.showCreateRoomModal}
              handleClose={this.createRoom}
              email={this.props.email}
              username={this.props.username}
              img={this.props.img}
              socket={this.props.socket}
            />
          </div>
          {fetchRooms()}
        </Container>
      </section>
    );
  }
}

export default ChatRooms;
