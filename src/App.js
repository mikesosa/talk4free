import React from "react";
import NavBar from "../src/components/NavBar/NavBar";
import ChatRooms from "./components/ChatRooms/ChatRooms";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import socketIOClient from "socket.io-client";
// import { Container } from "react-bootstrap";
// import axios from "axios";
import "./App.scss";
import { Users, AddUserinDb, CheckIfUser } from "./controllers/ApiRequests";

class App extends React.Component {
  state = {
    // Current user loggedin?
    isLoggedIn: false,
    // Current user
    userName: "",
    // Current user
    email: "",
    // Current user
    imageUrl: "",
    // All the users with active rooms
    users: []
  };

  checkUser = async email => {
    return CheckIfUser(email);
  };

  saveUser = async data => {
    if (data.email !== "") {
      const alreadyExist = await this.checkUser(this.state.email);
      if (!alreadyExist) {
        await AddUserinDb(data);
      }
    }
  };

  updateLogin = res => {
    this.setState({
      isLoggedIn: res.isSignedIn,
      userName: res.userName,
      email: res.email,
      imageUrl: res.imageUrl
    });
    // data to send
    let data = {
      email: this.state.email,
      username: this.state.userName,
      active: true,
      adm: false,
      img: this.state.imageUrl
    };
    this.saveUser(data);
  };

  getAllUsers = async () => {
    console.log(this.state.users);
    let response = await Users();
    this.setState({
      users: response
    });
  };

  componentDidMount() {
    // user connected to server
    console.log("Url es:", process.env.REACT_APP_SOCKECT_URL);
    const socket = socketIOClient(`${process.env.REACT_APP_SOCKECT_URL}`);
    socket.on("connect", () => {
      console.log("conectado al server");
      this.getAllUsers();
    });
    // real users in room
    socket.on("closeUserresp", resp => {
      if (resp) this.getAllUsers();
    });
    // real existing rooms
    socket.on("renderRoom", resp => {
      if (resp) this.getAllUsers();
    });
  }

  render() {
    return (
      <React.Fragment>
        <header className="mb-auto">
          <NavBar isLoggedIn={this.updateLogin} />
        </header>
        <Jumbotron />
        <ChatRooms
          isLoggedIn={this.state.isLoggedIn}
          username={this.state.userName}
          img={this.state.imageUrl}
          email={this.state.email}
          users={this.state.users}
        />
      </React.Fragment>
    );
  }
}

export default App;
