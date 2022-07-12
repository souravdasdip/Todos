import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER_INFO } from "../services/queries";

function MyProfile() {
  const { data, loading, error } = useQuery(GET_USER_INFO);
  //   console.log(data?.myProfile?.quotes);

  return (
    <div>
      <h1>My Profile</h1>
      {data && (
        <>
          <p>First Name: {data?.myProfile && data.myProfile.firstName}</p>
          <p>Last Name: {data?.myProfile && data?.myProfile?.lastName}</p>
          <p>Email: {data?.myProfile && data?.myProfile?.email}</p>
          <strong>Quotes</strong>
          <p>
            {data.myProfile.quotes.map((qt) => (
              <p>{qt.name}</p>
            ))}
          </p>
        </>
      )}

      <button
        onClick={() => {
          localStorage.removeItem("token");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default MyProfile;
