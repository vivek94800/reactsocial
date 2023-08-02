import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";




export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();
  const handleRegister = () => {
    axios
      .post("/register", {
        username:username,
        email:email,
        password:password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {
        console.log("Registration successful!");
        // Redirect to the login page after successful registration
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering:", error);
        // Handle registration errors, e.g., show an error message to the user
      });
  };
    return (
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">MAZE</h3>
            <span className="loginDesc">
              Post your thoughts.
            </span>
          </div>
          <div className="loginRight">
            <div className="registerBox">
            <input
              placeholder="Username"
              className="loginInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email"
              className="loginInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Password Again"
              type="password"
              className="loginInput"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
              <button className="loginButton" onClick={handleRegister}>Sign Up</button>
              <button className="loginRegisterButton">
                <Link to="/login">Log into Account</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }