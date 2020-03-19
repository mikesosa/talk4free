import React, { useState, useEffect } from "react";
import ChatRooms from "./ChatRooms/ChatRooms";
import Jumbotron from "./Jumbotron/Jumbotron";
import socket from "../controllers/socket";
import { Rooms } from "../controllers/ApiRequests";
import { Users, AddUserinDb, CheckIfUser } from "../controllers/ApiRequests";

const Home = props => {
  const [rooms, setRooms] = useState("");
  const [users, setUsers] = useState({});

  // ========================================================================

  const checkUser = async email => {
    return CheckIfUser(email);
  };

  // ========================================================================

  const saveUser = async data => {
    if (data.email !== "") {
      const alreadyExist = await checkUser(props.userInfo.email);
      if (!alreadyExist) {
        await AddUserinDb(data);
      }
    }
  };

  // ========================================================================

  // const updateLogin = res => {
  //   setUserInfo({
  //     userName: res.userName,
  //     email: res.email,
  //     imageUrl: res.imageUrl
  //   });
  //   setIsLoggedIn(res.isSignedIn);
  // };

  // ========================================================================

  const getAllUsers = async () => {
    console.log("Renderizando todos los usuarios");
    let response = await Users();
    setUsers({ users: response });
    await getRooms();
  };

  // ========================================================================

  const getRooms = async () => {
    console.log("Renderizando todos las rooms");

    let res = await Rooms();
    setRooms([...rooms, res]);
  };

  // ========================================================================

  useEffect(() => {
    if (props.isLoggedIn) {
      let data = {
        email: props.userInfo.email,
        username: props.userInfo.userName,
        img: props.userInfo.imageUrl,
        active: true,
        adm: false
      };
      saveUser(data);
    }
  }, [
    props.isLoggedIn,
    props.userInfo.email,
    props.userInfo.imageUrl,
    props.userInfo.userName
  ]);

  // ========================================================================

  useEffect(() => {
    // user connected to server
    socket.on("connect", () => {
      console.log("Connected to Server");
      getAllUsers();
    });
    // Rendering rooms with users
    socket.on("renderRooms", resp => {
      if (resp) getAllUsers();
    });
  }, []);

  // ========================================================================

  const renderChats = () => {
    if (Object.keys(users).length !== 0) {
      return (
        <ChatRooms
          isLoggedIn={props.isLoggedIn}
          username={props.userInfo.userName}
          img={props.userInfo.imageUrl}
          email={props.userInfo.email}
          users={users.users}
          socket={socket}
          rooms={rooms}
        />
      );
    }
  };

  // ========================================================================

  return (
    <React.Fragment>
      <Jumbotron isLoggedIn={props.isLoggedIn} />
      {renderChats()}
    </React.Fragment>
  );
};

export default Home;
