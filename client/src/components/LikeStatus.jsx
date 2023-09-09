import React, { useEffect, useState } from "react";
import WithAuth from "./WithAuth";
import { useParams } from "react-router-dom";
import axios from "axios";

const LikeStatus = () => {
  const [idea, setIdea] = useState({});
  const [addedBy, setAddedBy] = useState("");
  const [favoritedBy, setFavoritedBy] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/ideas/${id}`)
      .then((res) => {
        console.log("IDEA DATA ", res.data.idea);
        setIdea(res.data.idea);
        setAddedBy(res.data.idea.addedBy.alias);
        setFavoritedBy(res.data.idea.favoritedBy);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ marginTop: 80, marginLeft: 20 }}>
      <p>
        {addedBy} says: {idea.idea}
      </p>
      <br />
      <br />
      <p>People who liked this post</p>
      <div>
        <table>
          <tr>
            <th>Alias</th>
            <th>Name</th>
          </tr>
          {favoritedBy.map((fav) => {
            return (
              <tr key={fav._id}>
                <td>{fav.alias}</td>
                <td>{fav.name}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default WithAuth(LikeStatus);