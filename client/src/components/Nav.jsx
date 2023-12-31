import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtdecode from "jwt-decode";

const Nav = (props) => {
  const { cookieValue, user, setUser, loggedIn, setLoggedIn } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (cookieValue) {
      const decodedToken = jwtdecode(cookieValue);
      setUser(decodedToken); // Set the user data here
    }
    // eslint-disable-next-line
  }, [cookieValue]);

  const logout = () => {
    axios
      .post(
        "http://localhost:8000/api/users/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        navigate("/");
        setLoggedIn(false);
        setUser(null); // Clear the user data here
      })
      .catch((err) => console.log(err));
    console.log("logging out");
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <nav style={{ marginTop: 20, marginLeft: 20, marginBottom: 40 }}>
      <div>
        {loggedIn && <h4 style={{ display: "inline" }}>Hi, {user?.name}</h4>}
      </div>
      <div style={{ marginLeft: 10 }}>
        {loggedIn && (
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
