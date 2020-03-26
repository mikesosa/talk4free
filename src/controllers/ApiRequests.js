import axios from "axios";

/* =================================     SEND EMAIL    ===================================== */

const sendEmail = async data => {
  await axios({
    method: "POST",
    url: `${process.env.REACT_APP_MAILER_URL}/send`,
    data
  });
  return true;
};

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

/* =================================     All the users in DB     ===================================== */
const AllUsers = async () => {
  let res = await axios({
    method: "GET",
    headers: {
      token: process.env.REACT_APP_ZAFRA_KEY
    },
    url: `${process.env.REACT_APP_API_URL}/api/users`
  });
  return res.data;
};

/* =================================     Add a user if not exist in db     ===================================== */

const AddUserinDb = async data => {
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

/* =================================  Return type of user (Admin/Client)  ===================================== */

const checkTypeUser = async email => {
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
      if (users[index].email === email && users[index].adm === 1) {
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

/*================================================   get all  rooms   ========================================================== */

const AllRooms = async () => {
  let res = await axios({
    method: "GET",
    headers: {
      token: process.env.REACT_APP_ZAFRA_KEY
    },
    url: `${process.env.REACT_APP_API_URL}/api/rooms`
  });
  return res.data;
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
  const url = `${process.env.REACT_APP_API_URL}/api/users/join/${roomId}/${userId}`;
  await axios({
    method: "PUT",
    headers: {
      token: process.env.REACT_APP_ZAFRA_KEY
    },
    url: url
  });
};

/*=============================================== Remove user from Room =========================================================== */

const removeUserFromRoom = async (roomId, userId) => {
  const url = `${process.env.REACT_APP_API_URL}/api/users/out/${roomId}/${userId}`;
  await axios({
    method: "PUT",
    headers: {
      token: process.env.REACT_APP_ZAFRA_KEY
    },
    url: url
  });
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
  await axios({
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
};

// ====================== Deactivate Room =============================

const deactivateRoom = async roomId => {
  const url = `${process.env.REACT_APP_API_URL}/api/rooms/deactive/${roomId}`;
  await axios({
    method: "PUT",
    headers: {
      token: process.env.REACT_APP_ZAFRA_KEY
    },
    url: url
  });
};

// ====================== Decrease one user from Room =============================

const decreaseUserFromRoom = async roomId => {
  const url = `${process.env.REACT_APP_API_URL}/api/rooms/decrease/${roomId}`;
  await axios({
    method: "PUT",
    headers: {
      token: process.env.REACT_APP_ZAFRA_KEY
    },
    url: url
  });
};

// ====================== increase one user from Room =============================
const increaseUserFromRoom = async roomId => {
  const url = `${process.env.REACT_APP_API_URL}/api/rooms/increase/${roomId}`;
  await axios({
    method: "PUT",
    headers: {
      token: process.env.REACT_APP_ZAFRA_KEY
    },
    url: url
  });
};

/*==================================== Check if a user can join in the room ============================= */
const joinInRoomId = async roomId => {
  const result = await axios({
    method: "GET",
    headers: {
      token: process.env.REACT_APP_ZAFRA_KEY
    },
    url: `${process.env.REACT_APP_API_URL}/api/rooms/${roomId}`
  });
  const roominfo = result.data[0];
  if (roominfo.max_user > roominfo.active_users) return true;
  return false;
};

export {
  Users,
  AllUsers,
  AddUserinDb,
  CheckIfUser,
  checkTypeUser,
  Rooms,
  AllRooms,
  UserId,
  addUserToRoom,
  removeUserFromRoom,
  deactivateRoom,
  getRoomId,
  saveSession,
  decreaseUserFromRoom,
  increaseUserFromRoom,
  joinInRoomId,
  sendEmail
};
