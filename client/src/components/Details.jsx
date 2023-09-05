import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
  const [user, setUser] = useState({});
  const { user_id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${user_id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [user_id]);

  return (
    <div>
      <h1>Name: {user.name}</h1>
      <h2>Alias: {user.alias}</h2>
      <h3>Email: {user.email}</h3>
      <hr />
      <p>Total Number of Posts: {user.ideasAdded}</p>
      <p>Total Number of Likes: {user.ideasFavorited}</p>
    </div>
  );
};

export default Details;
