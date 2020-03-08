import React from "react";
import NavBar from "../src/components/NavBar/NavBar";
import ChatRooms from "./components/ChatRooms/ChatRooms";
import Jumbotron from "./components/Jumbotron/Jumbotron";
// import { Container } from "react-bootstrap";
import axios from "axios";
import "./App.scss";

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

  checkUser = async () => {
    const result = await axios({
      method: "GET",
      headers: {
        token: process.env.REACT_APP_ZAFRA_KEY
      },
      url: "https://talk4free.live/api/users"
    });
    const users = result.data;
    if (users.length > 0) {
      for (let index = 0; index < users.length; index++) {
        if (users[index].email === this.state.email) {
          return true;
        }
      }
    }
    return false;
  };

  saveUser = async () => {
    if (this.state.email !== "") {
      const alreadyExist = await this.checkUser();
      if (!alreadyExist) {
        axios({
          method: "POST",
          url: "https://talk4free.live/api/users",
          headers: {
            token: process.env.REACT_APP_ZAFRA_KEY
          },
          data: {
            email: this.state.email,
            username: this.state.userName,
            active: true,
            adm: false,
            img: this.state.imageUrl
          }
        });
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
    this.saveUser();
  };

  getAllUsers = async () => {
    // This will get all the users with an active room
    await axios({
      method: "GET",
      headers: {
        token: process.env.REACT_APP_ZAFRA_KEY
      },
      url: "https://talk4free.live/api/users"
    })
      .then(res => {
        let users = res.data.filter(user => user.room_id !== null);
        res.data = users;
        this.setState({
          users: res.data
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    // This will get all the users with an active room
    this.getAllUsers();
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
          email={this.state.email}
          users={this.state.users}
        />
        {/* <footer className="mt-auto">
          <Container>
            <p>Hello</p>
          </Container>
        </footer> */}
      </React.Fragment>
    );
  }
}

export default App;
