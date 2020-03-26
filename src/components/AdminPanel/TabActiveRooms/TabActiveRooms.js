import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaDotCircle, FaTrash } from "react-icons/fa";
import Participants from "../Participants/Participants";
import {
  removeUserFromRoom,
  decreaseUserFromRoom,
  deactivateRoom
} from "../../../controllers/ApiRequests";

const TabActiveRooms = props => {
  const [rooms, setRooms] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    setAllUsers(props.allUsers);
    setRooms(props.rooms);
  }, [props]);

  const handleDisableRoom = (roomId, usersId) => {
    //   if (typeof usersId )
    usersId = usersId.split`,`.map(x => +x);
    // console.log(typeof parseInt(usersId));
    usersId.map(userId => {
      removeUserFromRoom(roomId, userId);
      decreaseUserFromRoom(roomId);
      deactivateRoom(roomId);
      return true;
    });
    props.socket.emit("renderRooms", true);
  };

  const handleDate = date => {
    let newDate = date.replace("T", " ");
    newDate = newDate.slice(0, -5);
    return newDate;
  };

  return (
    <Table
      striped
      bordered
      hover
      size="sm"
      className="text-center align-middle"
    >
      <thead>
        <tr>
          <th>id</th>
          <th>Active</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Language</th>
          <th>Level</th>
          <th>Max Users</th>
          <th>Created by</th>
          <th>Participants</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rooms.length > 0 &&
          allUsers.length > 0 &&
          rooms[0].data.map((room, index) => {
            return (
              <tr key={index}>
                <td>{room.id} </td>
                <td>
                  <FaDotCircle style={{ color: "#0dff44" }} />
                </td>
                <td>{handleDate(room.created_at)}</td>
                <td>{handleDate(room.updated_at)}</td>
                <td>{room.lang}</td>
                <td>{room.lvl}</td>
                <td>{room.max_user}</td>
                <td>
                  <Participants
                    created_by={room.created_by}
                    allUsers={allUsers}
                  />
                </td>
                <td>
                  <Participants users={room.users} allUsers={allUsers} />
                </td>
                <td>
                  <button
                    onClick={() => handleDisableRoom(room.id, room.users)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default TabActiveRooms;
