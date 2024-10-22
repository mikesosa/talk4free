import React from "react";
import "./Jumbotron.scss";
import { FaSignInAlt, FaSkull } from "react-icons/fa";

import { Container, Row, Col, Image } from "react-bootstrap";

const Jumbotron = props => {
  const signInHandler = () => {
    document.getElementById("signInBtn").click();
  };
  return (
    <section className="jumbotron">
      <Container>
        <Row className="mt-5">
          <Col md="6">
            <h1>Practice languages at anytime.</h1>
            <p className="lead mt-5 mb-5">
              Talk4Free is created to talk to people around the world in many
              languages such as English, Mandarin, Spanish, French, German,
              Italian, Portuguese, Arabic, Russian, Japanese among others.
              <br />
              <br />
              People can exchange languages and culture, make friends and meet
              up people around the world.
            </p>
            <div className="callToActions">
              <button
                className="btn btn-primary my-2"
                onClick={() => {
                  if (!props.isLoggedIn) {
                    return signInHandler();
                  }
                }}
              >
                Join & Talk Now! <FaSignInAlt />
              </button>
              <a type="btn" href="#test" className="btn btn-secondary">
                Rules & Penalies <FaSkull />
              </a>
            </div>
          </Col>
          <Col md="6" className="introImage">
            <Image src={require("./logo10x10.png")} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Jumbotron;
