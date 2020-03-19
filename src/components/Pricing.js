import React from "react";
import { Container, Col } from "react-bootstrap";

const Pricing = () => {
  return (
    <Container className="pricing">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Pricing</h1>
        <p class="lead">
          Talk4Free is "free" for now. We know that right now the world needs to
          reinvent itself so that humanity does not have to leave home. So feel
          free to use it as you like. Enjoy!
        </p>
      </div>

      <div class="container">
        <div class="card-deck mb-3 text-center">
          <Col md={4} className="card m-auto p-0">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Free</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">
                $0 <small class="text-muted">/ mo</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>5 Users per call</li>
                <li>Video Streaming</li>
                <li>Audio Streaming</li>
                <li>Unlimited Fun!</li>
              </ul>
              <a
                href={process.env.REACT_APP_FRONT_URL}
                class="btn btn-lg btn-primary"
              >
                Talk for Free
              </a>
            </div>
          </Col>
        </div>
      </div>
    </Container>
  );
};

export default Pricing;
