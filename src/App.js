import React, { useState, useEffect } from "react";
import NavBar from "../src/components/NavBar/NavBar";
import ChatRooms from "./components/ChatRooms/ChatRooms";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import socket from "./controllers/socket";
import { Rooms } from "./controllers/ApiRequests";
import "./App.scss";
import { Users, AddUserinDb, CheckIfUser } from "./controllers/ApiRequests";

const App = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState("");
  const [users, setUsers] = useState({});
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    imageUrl: ""
  });

  const checkUser = async email => {
    return CheckIfUser(email);
  };

  const saveUser = async data => {
    if (data.email !== "") {
      const alreadyExist = await checkUser(userInfo.email);
      if (!alreadyExist) {
        await AddUserinDb(data);
      }
    }
  };

  const updateLogin = res => {
    setUserInfo({
      userName: res.userName,
      email: res.email,
      imageUrl: res.imageUrl
    });
    setIsLoggedIn(res.isSignedIn);
  };

  // ========================================================================

  const getAllUsers = async () => {
    let response = await Users();
    setUsers({ users: response });
    await getRooms();
  };

  const getRooms = async () => {
    // console.log(this.state.rooms);
    let res = await Rooms();

    setRooms([...rooms, res]);
  };
  // ========================================================================

  useEffect(() => {
    if (isLoggedIn) {
      let data = {
        email: userInfo.email,
        username: userInfo.userName,
        img: userInfo.imageUrl,
        active: true,
        adm: false
      };
      saveUser(data);
    }
  }, [isLoggedIn, userInfo.email, userInfo.imageUrl, userInfo.userName]);

  useEffect(() => {
    // user connected to server
    socket.on("connect", () => {
      console.log("Connected to Server");
      getAllUsers();
    });
    // real users in room
    // socket.on("closeUserresp", resp => {
    //   if (resp) getAllUsers();
    // });
    // real existing rooms
    socket.on("renderRooms", resp => {
      if (resp) getAllUsers();
    });
  }, []);

  const renderChats = () => {
    if (Object.keys(users).length !== 0) {
      return (
        <ChatRooms
          isLoggedIn={isLoggedIn}
          username={userInfo.userName}
          img={userInfo.imageUrl}
          email={userInfo.email}
          users={users.users}
          socket={socket}
          rooms={rooms}
        />
      );
    }
  };

  return (
    <React.Fragment>
      <header className="mb-auto">
        <NavBar isLoggedIn={updateLogin} />
      </header>
      <Jumbotron isLoggedIn={isLoggedIn} />
      {renderChats()}
    </React.Fragment>
  );
};

export default App;
