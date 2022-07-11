import { useMutation } from "@apollo/client";
import React from "react";
import FormInput from "../components/FormInput";
import { SIGNUP_USER } from "../services/mutation";

function Registration() {
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  const handleRegistration = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
    signupUser({
      variables: {
        userNew: data,
      },
    });
  };

  console.log({ loading });
  console.log({ data });
  console.log({ error });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h4>Registration</h4>
      <form onSubmit={handleRegistration}>
        <FormInput name="firstName" placeholder="Enter First Name..." />
        <FormInput name="lastName" placeholder="Enter Last Name..." />
        <FormInput name="email" placeholder="Enter Email..." />
        <FormInput name="password" placeholder="Enter Password..." />
        <button>Registration</button>
        {data && <h6>You can signin "{data.user.firstName}"</h6>}
      </form>
    </div>
  );
}

export default Registration;
