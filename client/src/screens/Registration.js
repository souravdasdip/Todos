import React from "react";
import FormInput from "../components/FormInput";

function Registration() {
  const handleRegistration = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
    formdata.delete("firstName");
  };
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
      </form>
    </div>
  );
}

export default Registration;
