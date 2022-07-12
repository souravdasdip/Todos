import { useMutation } from "@apollo/client";
import React from "react";
import FormInput from "../components/FormInput";
import { SIGNIN_USER } from "../services/mutation";
import { GET_USER_INFO } from "../services/queries";

function Login() {
  const [signInUser, { data, loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.user.token);
      console.log("On complete: ", data);
    },
    refetchQueries: ["getUserInfo"],
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
    //sign in to server
    signInUser({
      variables: {
        userSignin: data,
      },
    });
  };

  console.log(data?.user?.token);

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
        {data && <p>{data.user.token}</p>}
      </form>
    </div>
  );
}

export default Login;
