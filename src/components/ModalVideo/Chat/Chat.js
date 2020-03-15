import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Chat.scss";

const Chat = props => {
  const [message, setMessage] = useState("nada");
  const [session, setSession] = useState(null);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => {
    document.getElementById("message").value = "";
    session.signal(
      {
        type: "msg",
        data: data.message
      },
      function(error) {
        if (error) {
          console.log("Error sending signal:", error.name, error.message);
        } else {
          console.log("sent");
        }
      }
    );
  };

  useEffect(() => {
    if (props.session) {
      if (props.session.current) {
        setSession(props.session.current.sessionHelper.session);
        if (session) {
          session.on("signal:msg", res => setMessage(res.data));
        }
      }
    }
  }, [props, message, session]);

  return (
    <div className="chat-popup" id="myForm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container"
        autoComplete="off"
      >
        <h1>Chat</h1>
        <span style={{ color: "red" }}>{message}</span>
        <br></br>

        <label htmlFor="message">
          <b>Message</b>
        </label>
        <input
          placeholder="Type message.."
          name="message"
          id="message"
          ref={register()}
          required
        />

        <button type="submit" className="btn">
          Send
        </button>
        {/* <button type="button" class="btn cancel" onclick="closeForm()">
          Close
        </button> */}
      </form>
    </div>
  );
};

export default Chat;
