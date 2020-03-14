import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Chat() {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    console.log(data, e);
    session.signal();
  };

  // useEffect(() => {
  //   console.log("asdasda");
  //   form.addEventListener('submit', function(event) {
  //     event.preventDefault();

  //       session.signal({
  //           type: 'msg',
  //           data: msgTxt.value
  //         }, function(error) {
  //         if (error) {
  //           console.log('Error sending signal:', error.name, error.message);
  //         } else {
  //           msgTxt.value = '';
  //         }
  //       });
  //     });
  //   });
  // }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="exampleRequired"
        placeholder={message}
        ref={register({ required: true })}
      />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}
