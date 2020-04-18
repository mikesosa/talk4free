import React, { useState, useEffect } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import "./AdminPanel.scss";
import TabActiveRooms from "./TabActiveRooms/TabActiveRooms";
import TabAllRooms from "./TabAllRooms/TabAllRooms";
import TabAllUses from "./TabAllUses/TabAllUses";
import { AllUsers, AllRooms } from "../../controllers/ApiRequests";

const AdminPanel = props => {
  const [key, setKey] = useState("activeRooms");
  const [allUsers, setAllUsers] = useState([]);
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setAllUsers(await AllUsers());
      setAllRooms(await AllRooms());
    }
    fetchData();
  }, []);

  return (
    <Container className="adminPanel">
      <h3>Welcome Admin: {props.userInfo.userName}</h3>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="activeRooms" title="Active Rooms">
          <TabActiveRooms
            rooms={props.rooms}
            allUsers={allUsers}
            socket={props.socket}
          />
        </Tab>
        <Tab eventKey="allRoons" title="All Rooms">
          <TabAllRooms
            rooms={allRooms}
            allUsers={allUsers}
            socket={props.socket}
          />
        </Tab>
        <Tab eventKey="users" title="All Users">
          <TabAllUses allUsers={allUsers} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminPanel;
