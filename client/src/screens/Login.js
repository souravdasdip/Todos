import React from "react";
import FormInput from "../components/FormInput";

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
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
      <h4>Login</h4>
      <form onSubmit={handleLogin}>
        <FormInput name="email" placeholder="Enter Email..." />
        <FormInput name="password" placeholder="Enter Password..." />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
