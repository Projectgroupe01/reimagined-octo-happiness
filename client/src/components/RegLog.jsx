import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = (props) => {
  const { setLoggedIn, count, setCount } = props;
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userInfoReg, setUserInfoReg] = useState({
    name: "",
    alias: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userInfoLog, setUserInfoLog] = useState({
    email: "",
    password: "",
  });

  const regChange = (e) => {
    setUserInfoReg({
      ...userInfoReg,
      [e.target.name]: e.target.value,
    });
  };
  const logChange = (e) => {
    setUserInfoLog({
      ...userInfoLog,
      [e.target.name]: e.target.value,
    });
  };

  const regSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users/register", userInfoReg, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setCount(count + 1); //update nav username & logout button
        navigate("/dashboard");
        setLoggedIn(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(`submit errer`, err);
        setErrors({
          name: err.response.data.errors.name,
          alias: err.response.data.errors.alias,
          email: err.response.data.errors.email,
          password: err.response.data.errors.password,
          confirmPassword: err.response.data.errors.confirmPassword,
        });
        console.log(errors);
      });
  };

  const logSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users/login", userInfoLog, {
        withCredentials: true,
      })
      .then((res) => {
        setCount(count + 1); //update nav username & logout button
        navigate("/dashboard");
        setLoggedIn(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(`login errer`, err);
        setErrors({
          message: err.response.data.message,
        });
        console.log(errors);
      });
  };

  return (
    <div className="row col-sm-6 mx-auto mt-5">
      <h1 className="text-center">Bright IDEAS !</h1> 
      <br />
      <div className="col">
        <form className="regLog" onSubmit={regSubmit}>
          <h3>Register</h3>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={userInfoReg.name}
              onChange={regChange}
              />
          </div>
              {errors.name ? (
                <p className="text-danger">{errors.name.message}</p>
              ) : null}
          <div className="form-group">
            <label className="form-label">Alias</label>
            <input
              type="text"
              className="form-control"
              name="alias"
              value={userInfoReg.alias}
              onChange={regChange}
              />
          </div>
              {errors.alias ? (
                <p className="text-danger">{errors.alias.message}</p>
              ) : null}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={userInfoReg.email}
              onChange={regChange}
              />
          </div>
          {errors.email ? (
            <p className="text-danger">{errors.email.message}</p>
          ) : null}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={userInfoReg.password}
              onChange={regChange}
              />
          </div>
              {errors.password ? (
                  <p className="text-danger">{errors.password.message}</p>
              ) : null}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={userInfoReg.confirmPassword}
              onChange={regChange}
              />
          </div>
              {errors.confirmPassword ? (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              ) : null}
          <div className="form-group">
            <button type="submit" className="btn btn-success mt-3">
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="col">
        <form className="regLog" onSubmit={logSubmit}>
          <h3>Login</h3>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={userInfoLog.email}
              onChange={logChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={userInfoLog.password}
              onChange={logChange}
              />
          </div>
              {errors.message ? (
                <p className="text-danger">{errors.message}</p>
              ) : null}
          <div className="form-group">
            <button type="submit" className="btn btn-success mt-3">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
