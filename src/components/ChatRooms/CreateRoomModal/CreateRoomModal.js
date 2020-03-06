import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Languages from "../../../languages";
import { useForm } from "react-hook-form";
import CreateSession from "../../../controllers/CreateSession";
import opentok from "../../../controllers/opentok";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import axios from "axios";

function CreateRoomModal(props) {
  const [completed, setCompleted] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    const session_id = await CreateSession();
    const user_token = await opentok.generateToken(session_id);
    setSessionId(session_id);
    setUserToken(user_token);
    setCompleted(true);
    // Save into db
    const saveSession = async () => {
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
            created_by: await getUserId()
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    // Get user id
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
    // Get user id
    const getRoomId = async () => {
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
          if (rooms[index].session_id === session_id) {
            return rooms[index].id;
          }
        }
      }
      return null;
    };
    // Updating users in room
    const updateRoomUsers = async () => {
      await saveSession();
      const url = `http://localhost:5000/api/users/join/${await getRoomId()}/${await getUserId()}`;
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
      // This will update the rooms list
      props.onUpdate();
    };
    updateRoomUsers();
  };

  const byeUserFromRoom = () => {
    // console.log(await getUserId());
  };

  const handleClose = () => {
    // if there is a session goin on
    if (completed) {
      console.log("Colgando...");
      byeUserFromRoom();

      // If no sessions just close the modal
    } else {
      props.handleClose();
    }
  };
  // FORM OR VIDEO?
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
        <React.Fragment>
          <OTSession
            apiKey={process.env.REACT_APP_OPENTOK_API_KEY}
            sessionId={sessionId}
            token={userToken}
          >
            <OTPublisher />
            <OTStreams>
              <OTSubscriber />
            </OTStreams>
          </OTSession>
        </React.Fragment>
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
