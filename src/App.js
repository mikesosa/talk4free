import React, { useState, useEffect } from "react";
import NavBar from "../src/components/NavBar/NavBar";
import ChatRooms from "./components/ChatRooms/ChatRooms";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import socketIOClient from "socket.io-client";
import "./App.scss";
import { Users, AddUserinDb, CheckIfUser } from "./controllers/ApiRequests";

const App = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
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
    setIsLoggedIn(res.isLoggedIn);
    setUserInfo({
      userName: res.userName,
      email: res.email,
      imageUrl: res.imageUrl
    });
    // data to send
    let data = {
      email: userInfo.email,
      username: userInfo.userName,
      img: userInfo.imageUrl,
      active: true,
      adm: false
    };
    saveUser(data);
  };

  useEffect(() => {
    const socket = socketIOClient(`${process.env.REACT_APP_SOCKECT_URL}`);
    const getAllUsers = async () => {
      let response = await Users();
      setUsers({ ...users, users: response });
    };
    // user connected to server
    socket.on("connect", () => {
      console.log("conectado al server");
      getAllUsers();
    });
    // real users in room
    socket.on("closeUserresp", resp => {
      if (resp) getAllUsers();
    });
    // real existing rooms
    socket.on("renderRoom", resp => {
      if (resp) getAllUsers();
    });
    getAllUsers();
  }, [users]);

  return (
    <React.Fragment>
      <header className="mb-auto">
        <NavBar isLoggedIn={updateLogin} />
      </header>
      <Jumbotron />
      <ChatRooms
        isLoggedIn={isLoggedIn}
        username={userInfo.userName}
        img={userInfo.imageUrl}
        email={userInfo.email}
        users={users}
      />
    </React.Fragment>
  );
};

export default App;
