import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Languages from "../../../languages";
import { useForm } from "react-hook-form";
import CreateSessionId from "../../../controllers/CreateSessionId";
import opentok from "../../../controllers/opentok";
import Video from "./Video";
// import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import axios from "axios";

function CreateRoomModal(props) {
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
      url: "http://localhost:5000/api/users"
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
      url: "http://localhost:5000/api/rooms"
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
        url: "http://localhost:5000/api/rooms",
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
    const url = `http://localhost:5000/api/users/join/${roomId}/${userId}`;
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
    // console.log(await getUserId());
    const url = `http://localhost:5000/api/users/out/${roomId}/${userId}`;
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

  /* ====================== decrease one user ============================*/
  const decreaseUserFromRoom = async () => {
    const url = `http://localhost:5000/api/rooms/decrease/${roomId}`;
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
  };

  const handleClose = async () => {
    // if there is a session goin on
    if (completed) {
      await removeUserFromRoom();
      await decreaseUserFromRoom();
      // setSessionId(null);
      // setUserToken(null);
      // setRoomId(null);
      // setCompleted(false);
      props.handleClose();
      props.onUpdate();
      // If no sessions just close the modal
    } else {
      props.handleClose();
    }
  };
  // Rendering the form or video in the modal
  const checkStatus = () => {
    if (!completed) {
      return (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Language</Form.Label>
              <Form.Control
                as="select"
                name="lang"
                ref={register({ required: true })}
              >
                <option value="">Choose a language...</option>
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
              <Form.Label>Level</Form.Label>
              <Form.Control
                as="select"
                name="level"
                ref={register({ required: true })}
              >
                <option value="">Choose...</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermidiate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Form.Control>
              {errors.level && <small>Please choose a level</small>}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Max People</Form.Label>
              <Form.Control
                as="select"
                name="maxPeople"
                ref={register({ required: true })}
              >
                <option value="">Choose...</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
              {errors.maxPeople && <small>Please select a number</small>}
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ justifyContent: "flex-end" }}>
            <Button variant="secondary" onClick={props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="ml-3 ">
              Join Room
            </Button>
          </Form.Row>
        </Form>
      );
    } else {
      return (
        <Video
          apiKey={process.env.REACT_APP_OPENTOK_API_KEY}
          sessionId={sessionId}
          token={userToken}
        />
        // <React.Fragment>
        //   <OTSession
        //     apiKey={process.env.REACT_APP_OPENTOK_API_KEY}
        //     sessionId={sessionId}
        //     token={userToken}
        //   >
        //     <OTPublisher />
        //     <OTStreams>
        //       <OTSubscriber />
        //     </OTStreams>
        //   </OTSession>
        // </React.Fragment>
      );
    }
  };
  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>{checkStatus()}</Modal.Body>
    </Modal>
  );
}

export default CreateRoomModal;
