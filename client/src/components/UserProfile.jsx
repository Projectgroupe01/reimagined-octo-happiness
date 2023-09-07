import React from "react";
import WithAuth from "./WithAuth";
import { useParams } from "react-router-dom";

const UserProfile = (props) => {
  const { count, setCount, user, welcome, darkMode } = props;

  const { id } = useParams();
  return (
    <div>
      <p>ID User : {id}</p>
      UserProfile
    </div>
  );
};

export default WithAuth(UserProfile);
