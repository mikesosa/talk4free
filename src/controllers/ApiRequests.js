import axios from "axios";

/* =================================     get users with rooms     ===================================== */
let Users = async () => {
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

let AddUserinDb = async data => {
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

let CheckIfUser = async email => {
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

let Rooms = async () => {
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

let UserId = async email => {
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

export { Users, AddUserinDb, CheckIfUser, Rooms, UserId };
