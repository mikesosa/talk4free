import React from "react";
import "./Jumbotron.scss";
import { Container, Row, Col } from "react-bootstrap";

const Jumbotron = () => {
  return (
    <section className="jumbotron">
      <Container>
        <Row className="mt-5">
          <Col md="6">
            <h1>Practice lenguages at anytime.</h1>
            <p className="lead mt-5 mb-5">
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don’t simply skip over it entirely.
            </p>
            <p>
              <a href="#test" className="btn btn-primary my-2">
                Main call to action
              </a>
              <a href="#test" className="btn btn-secondary my-2 ml-4">
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
  );
};

export default Jumbotron;
