import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";




export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const handleRegister = () => {
    axios
      .post("/register", {
        username:username,
        email:email,
        password:password,
        password_confirmation: passwordConfirmation,
        phone_number: phoneNumber,
      })
      .then((response) => {
        console.log("Registration successful!");
        // Redirect to the login page after successful registration
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error;
          if (errorMessage.includes("phone_number")) {
            alert("Invalid phone number format or already taken.");
          } else {
            alert(errorMessage);
          }
        } else {
          console.error("Error registering:", error);
          alert("An error occurred while registering.");
        }
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
             placeholder="Phone Number"
             className="loginInput"
             value={phoneNumber}
             onChange={(e) => setPhoneNumber(e.target.value)}
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