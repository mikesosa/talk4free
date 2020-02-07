import React from "react";
import RoomsList from "../RoomsList/RoomsList";
import apiTest from "../../apiTest";

import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Col,
  Button
} from "react-bootstrap";
import "./App.scss";
import { Row } from "react-bootstrap";

function App() {
  return (
    <React.Fragment>
      <header className="mb-auto">
        <Navbar bg="dark" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="#home">Talk4Free</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Button variant="primary" className="ml-5">
              Sing In
            </Button>
          </Container>
        </Navbar>
      </header>
      <main role="main">
        <section className="jumbotron">
          <Container>
            <Row className="mt-5">
              <Col md="6">
                <h1>Practice lenguages at anytime.</h1>
                <p className="lead mt-5 mb-5">
                  Something short and leading about the collection below—its
                  contents, the creator, etc. Make it short and sweet, but not
                  too short so folks don’t simply skip over it entirely.
                </p>
                <p>
                  <a href="#" className="btn btn-primary my-2">
                    Main call to action
                  </a>
                  <a href="#" className="btn btn-secondary my-2 ml-4">
                    Secondary action
                  </a>
                </p>
              </Col>
              <Col md="6" className="text-center">
                <h2>Form</h2>
              </Col>
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
              <h1 className="display-4">Chat Rooms</h1>
              <p class="lead">
                Quickly build an effective pricing table for your potential
                customers with this Bootstrap example. It’s built with default
                Bootstrap components and utilities with little customization.
              </p>
            </div>
            <RoomsList rooms={apiTest.rooms} />
          </Container>
        </section>
      </main>
      <footer className="mt-auto">
        <Container>
          <p>Hello</p>
        </Container>
      </footer>
    </React.Fragment>
  );
}

export default App;
