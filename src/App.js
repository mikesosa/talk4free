import React from "react";
import NavBar from "../src/components/NavBar/NavBar";
import ChatRooms from "./components/ChatRooms/ChatRooms";
import Jumbotron from "./components/Jumbotron/Jumbotron";
// import { Container } from "react-bootstrap";
import axios from "axios";
import "./App.scss";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    userName: "",
    email: "",
    imageUrl: ""
  };

  checkUser = async () => {
    const result = await axios({
      method: "GET",
      url: "http://localhost:5000/api/users"
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
          url: "http://localhost:5000/api/users",
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
  render() {
    return (
      <React.Fragment>
        <header className="mb-auto">
          <NavBar isLoggedIn={this.updateLogin} />
        </header>
        <Jumbotron />
        <ChatRooms isLoggedIn={this.state.isLoggedIn} />
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
