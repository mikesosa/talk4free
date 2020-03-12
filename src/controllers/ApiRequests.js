import axios from "axios";

/* =================================     get users with rooms     ===================================== */
const Users = async () => {
  let res = await axios({
    method: "GET",
    headers: {
      token: process.env.REACT_APP_ZAFRA_KEY
    },
    url: `${process.env.REACT_APP_API_URL}/api/users`
  });
  let users = res.data.filter(user => user.room_id !== null);
  res.data = users;
  return res.data;
};

/* =================================     Add a user if not exist in db     ===================================== */

const AddUserinDb = async data => {
  console.log("esta es la data que llega", data);
  await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/api/users`,
    headers: {
      token: process.env.REACT_APP_ZAFRA_KEY
    },
    data
  });
  return true;
};

/* =================================     check if user with email exists in Db     ===================================== */

const CheckIfUser = async email => {
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
      if (users[index].email === email) {
        return true;
      }
    }
  }
  return false;
};

/*================================================   get all active rooms   ========================================================== */

const Rooms = async () => {
  let res = await axios({
    method: "GET",
    headers: {
      token: process.env.REACT_APP_ZAFRA_KEY
    },
    url: `${process.env.REACT_APP_API_URL}/api/rooms`
  });
  let activerooms = res.data.filter(elem => elem.active !== 0);
  res.data = activerooms;
  return res;
};

/*================================================   get User ID  ========================================================== */

const UserId = async email => {
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
      if (users[index].email === email) {
        return users[index].id;
      }
    }
  }
  return null;
};

/*================================================   add user to Room ========================================================== */

const addUserToRoom = async (roomId, userId) => {
  console.log("se esta incrementando");
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
};

/*===============================================    Remove user from Room =========================================================== */

const removeUserFromRoom = async (roomId, userId) => {
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

/* ==================================================== Get room Id =============================================================*/
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

/* ==================================================== Save Room ================================================================ */
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

// ====================== Decrease one user from Room =============================
const decreaseUserFromRoom = async roomId => {
  const url = `${process.env.REACT_APP_API_URL}/api/rooms/decrease/${roomId}`;
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

// ====================== Decrease one user from Room =============================
const increaseUserFromRoom = async roomId => {
  const url = `${process.env.REACT_APP_API_URL}/api/rooms/increase/${roomId}`;
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

export {
  Users,
  AddUserinDb,
  CheckIfUser,
  Rooms,
  UserId,
  addUserToRoom,
  removeUserFromRoom,
  getRoomId,
  saveSession,
  decreaseUserFromRoom,
  increaseUserFromRoom
};
