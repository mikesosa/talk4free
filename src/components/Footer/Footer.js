import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Footer.scss";
import { FaHeart, FaCaretRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={4} className="text-center">
            <a href={process.env.REACT_APP_FRONT_URL} className="navbar-brand ">
              <Image src={require("../NavBar/logo5x5.png")} />
              Talk4Free
            </a>
          </Col>
          <Col md={4} className="text-center">
            <p className="info">
              &copy; 2019-2020 Talk4Free. &middot; <a href="#test">Privacy</a>{" "}
              &middot; <a href="#test">Terms</a>
            </p>
          </Col>
          <Col md={4} className="creds">
            <p>
              Made with <FaHeart /> by{" "}
              <a href="https://www.linkedin.com/in/mike-sosa/" target="n_blank">
                Michael{" "}
              </a>
              <FaCaretRight />
              <a
                href="https://www.linkedin.com/in/luischaparroc/"
                target="n_blank"
              >
                {" "}
                Luis{" "}
              </a>
              <FaCaretRight />
              <a
                href="https://www.linkedin.com/in/jorge-enrique-zafra-ria%C3%B1o-49268193/"
                target="n_blank"
              >
                {" "}
                Jorge
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
