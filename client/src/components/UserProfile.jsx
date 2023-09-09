import React, { useEffect, useState } from "react";
import WithAuth from "./WithAuth";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [userIdeas, setUserIdeas] = useState(0);
  const [userLikes, setUserLikes] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then((res) => {
        console.log("USER DATA ", res.data.user);
        setUserProfile(res.data.user);
        setUserIdeas(res.data.user.ideasAdded.length);
        setUserLikes(res.data.user.ideasFavorited.length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ marginTop: 80, marginLeft: 20 }}>
     <br />
     <br />
     <br />
      <br />
      <p>Name : {userProfile.name}</p>
      <p>Alias : {userProfile.alias}</p>
      <p>Email : {userProfile.email}</p>
      <br />
      <hr />
      <br />
      <p>Total Number of Ideas: {userIdeas}</p>
      <p>Total Number of Likes: {userLikes}</p>
    </div>
  );
};

export default WithAuth(UserProfile);
