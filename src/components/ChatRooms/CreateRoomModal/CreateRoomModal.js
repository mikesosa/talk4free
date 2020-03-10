import React, { useState } from "react";
import "./CreateRoomModal.scss";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import ModalVideo from "../../ModalVideo/ModalVideo";
import Languages from "../../../languagesEmojis";
import { useForm } from "react-hook-form";
import CreateSessionId from "../../../controllers/CreateSessionId";
import opentok from "../../../controllers/opentok";
import socketIOClient from "socket.io-client";
// import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import axios from "axios";

function CreateRoomModal(props) {
  const socket = socketIOClient("http://localhost:5000");

  const [completed, setCompleted] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState("");
  const { register, handleSubmit, errors } = useForm();

  /* ==================================== FUNCTIONS ============================================*/

  // =============== Get user Id ==============================
  const getUserId = async () => {
    const result = await axios({
      method: "GET",
      headers: {
        token: process.env.REACT_APP_ZAFRA_KEY
      },
      url: `${process.env.REACT_APP_API_URL}/api/users`
    });
    const users = result.data;
    if (users.length > 0) {
      for (let index = 0; index < users.length; index++) {
        if (users[index].email === props.email) {
          return users[index].id;
        }
      }
    }
    return null;
  };

  // ============= Get room Id ====================================
  const getRoomId = async ss_id => {
    const result = await axios({
      method: "GET",
      headers: {
        token: process.env.REACT_APP_ZAFRA_KEY
      },
      url: `${process.env.REACT_APP_API_URL}/api/rooms`
    });
    const rooms = result.data;
    if (rooms.length > 0) {
      for (let index = 0; index < rooms.length; index++) {
        if (rooms[index].session_id === ss_id) {
          return rooms[index].id;
        }
      }
    }
    return null;
  };

  // =================== Save Room in DB =================================
  // Save into db
  const saveSession = async (data, session_id, userId) => {
    try {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/api/rooms`,
        headers: {
          token: process.env.REACT_APP_ZAFRA_KEY
        },
        data: {
          session_id: session_id,
          lang: data.lang,
          lvl: data.level,
          max_user: data.maxPeople,
          active: true,
          created_by: userId
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ====================== Add User to Room =============================
  const addUserToRoom = async (roomId, userId) => {
    const url = `${process.env.REACT_APP_API_URL}/api/users/join/${roomId}/${userId}`;
    try {
      axios({
        method: "PUT",
        headers: {
          token: process.env.REACT_APP_ZAFRA_KEY
        },
        url: url
      });
    } catch (error) {
      console.log(error);
    }
    // This will update the rooms list on the frontend
    props.onUpdate();
  };

  // ===================== Remove User from Room ============================
  const removeUserFromRoom = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/users/out/${roomId}/${userId}`;
    try {
      await axios({
        method: "PUT",
        headers: {
          token: process.env.REACT_APP_ZAFRA_KEY
        },
        url: url
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* ========================================== CALLING FUNCTIONS =============================================*/
  const onSubmit = async data => {
    const session_id = await CreateSessionId();
    const user_token = await opentok.generateToken(session_id);
    const user_id = await getUserId();
    await saveSession(data, session_id, user_id);
    const room_id = await getRoomId(session_id);
    await addUserToRoom(room_id, user_id);
    // Setting states
    setSessionId(session_id);
    setUserToken(user_token);
    setUserId(user_id);
    setRoomId(room_id);
    setCompleted(true);
    socket.emit("createRoom", true);
    props.handleClose();
  };

  const handleClose = async () => {
    // if there is a session goin on
    if (completed) {
      await removeUserFromRoom();
      //
      socket.emit("closeRoom", true);
      //
      props.handleClose();
      setCompleted(false);
      // If no sessions just close the modal
    } else {
      props.handleClose();
    }
  };
  // Rendering the form or video in the modal
  const renderForm = () => {
    return (
      <React.Fragment>
        <Modal.Header>
          <Modal.Title>Create a Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
              <Form.Group as={Col}>
                {/* <Form.Label>Language</Form.Label> */}
                <Form.Control
                  as="select"
                  name="lang"
                  ref={register({ required: true })}
                >
                  <option value="">Choose a language</option>
                  {Languages.map((lang, index) => {
                    return (
                      <option value={lang} key={index}>
                        {lang}
                      </option>
                    );
                  })}
                </Form.Control>
                {errors.lang && <small>Please select a language</small>}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                {/* <Form.Label>Level</Form.Label> */}
                <Form.Control
                  as="select"
                  name="level"
                  ref={register({ required: true })}
                >
                  <option value="">Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Form.Control>
                {errors.level && <small>Please choose a level</small>}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                {/* <Form.Label>Max People</Form.Label> */}
                <Form.Control
                  as="select"
                  name="maxPeople"
                  ref={register({ required: true })}
                >
                  <option value="">Max People</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
                {errors.maxPeople && <small>Please select a number</small>}
              </Form.Group>
            </Form.Row>
            <Form.Row style={{ justifyContent: "center" }}>
              <Button variant="secondary" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="ml-3 ">
                Create Room
              </Button>
            </Form.Row>
          </Form>
        </Modal.Body>
      </React.Fragment>
    );
  };

  if (!completed) {
    return (
      <Modal show={props.show} onHide={handleClose} id="CreateRoomModal">
        <Row>
          <Col md={4} className="info">
            <Row>
              <div
                className="participant"
                style={{ backgroundImage: `url(${props.img})` }}
              ></div>
              <h4>Remember</h4>
              <p>
                You will get banned if sharing bad topics{" "}
                <a href="#Sdsd">Click here for more details</a>
              </p>
            </Row>
          </Col>
          <Col md={8}>{renderForm()}</Col>
        </Row>
      </Modal>
    );
  } else {
    return (
      <ModalVideo
        show={true}
        sessionId={sessionId}
        token={userToken}
        roomId={roomId}
        onUpdate={props.onUpdate}
        handleClose={handleClose}
      />
    );
  }
}

export default CreateRoomModal;
