import React from "react";
import NavBar from "../src/components/NavBar/NavBar";
import ChatRooms from "./components/ChatRooms/ChatRooms";
import Jumbotron from "./components/Jumbotron/Jumbotron";
// import { Container } from "react-bootstrap";
import "./App.scss";

class App extends React.Component {
  state = {
    isLoggedIn: false
  };
  updateLogin = res => {
    this.setState({
      isLoggedIn: res
    });
    console.log(`Is logged in: ${this.state.isLoggedIn}`);
  };
  render() {
    return (
      <React.Fragment>
        <header className="mb-auto">
          <NavBar isLoggedIn={this.updateLogin} />
        </header>
        <Jumbotron />
        <ChatRooms />
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
