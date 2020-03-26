import React, { useState, useEffect } from "react";
import { FaDotCircle, FaTrash } from "react-icons/fa";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import "./TabAllRooms.scss";

const TabAllRooms = props => {
  const [newRooms, setNewRooms] = useState([]);
  const rooms = props.rooms;
  const allUsers = props.allUsers;

  const createNewArr = async () => {
    let usersInRoom;
    rooms.map(room => {
      let names = [];

      if (typeof room.users !== "object") {
        usersInRoom = room.users.split`,`.map(x => +x);
        usersInRoom.map(userid => {
          for (let index = 0; index < allUsers.length; index++) {
            const usr = allUsers[index];
            if (usr.id === parseInt(room.created_by)) {
              room.created_by = usr.username;
              room.created_at = room.created_at.replace("T", " ");
              room.created_at = room.created_at.slice(0, -5);
              room.updated_at = room.updated_at.replace("T", " ");
              room.updated_at = room.updated_at.slice(0, -5);
              if (room.active === 0) {
                room.active = <FaDotCircle className="roomLed" />;
              } else {
                room.active = <FaDotCircle className="roomLed roomActive" />;
              }
            }
            if (usr.id === userid) {
              names.push(<a href="#asd"> {usr.username}</a>);
            }
          }
        });
        room.users = names;
      }
      return true;
    });
  };

  useEffect(() => {
    async function fetchData() {
      await createNewArr();
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    setNewRooms(rooms);
  }, [rooms, newRooms]);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      filter: textFilter()
    },
    {
      dataField: "active",
      text: "Active"
    },
    {
      dataField: "created_at",
      text: "Created on"
    },
    {
      dataField: "updated_at",
      text: "Updated"
    },
    {
      dataField: "lang",
      text: "Languages"
    },
    {
      dataField: "lvl",
      text: "Level"
    },
    {
      dataField: "created_by",
      text: "Created by",
      filter: textFilter()
    },
    {
      dataField: "users",
      text: "Users"
    },
    {
      dataField: "",
      text: "Action"
    }
  ];
  const pagination = paginationFactory({
    page: 3,
    hideSizePerPage: true,
    sizePerPage: 5
  });

  return (
    <BootstrapTable
      keyField="id"
      data={newRooms}
      columns={columns}
      filter={filterFactory()}
      classes="allRoomsTable"
      pagination={pagination}
    />
  );
};

export default TabAllRooms;
