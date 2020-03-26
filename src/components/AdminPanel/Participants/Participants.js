import React, { useState, useEffect } from "react";

const Participants = props => {
  const usersId = props.users
    ? props.users.split`,`.map(x => +x)
    : props.created_by;
  const allUsers = props.allUsers;
  const [par, setPar] = useState([]);

  const checkUser = async () => {
    const participants = [];

    if (allUsers && usersId) {
      if (typeof usersId === "object") {
        usersId.map(user => {
          for (let index = 0; index < allUsers.length; index++) {
            const element = allUsers[index];
            if (element.id === user) {
              participants.push(element);
            }
          }
          return true;
        });
      } else {
        for (let index = 0; index < allUsers.length; index++) {
          const element = allUsers[index];
          if (element.id === usersId) {
            participants.push(element);
          }
        }
      }
    }
    return participants;
  };

  useEffect(() => {
    async function fetchData() {
      setPar(await checkUser());
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {par.map((participant, index) => {
        return (
          <a href="#asd" key={index}>
            <strong>{participant.username}</strong>{" "}
          </a>
        );
      })}
    </React.Fragment>
  );
};

export default Participants;
