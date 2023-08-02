import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail]= useState("")
  const [password,setPassword]= useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
  const handleLogin= ()=>{
    axios
    .post("/login",{email,password})
    .then((response)=>{
      const token = response.data.token;
      // Save the token to local storage or cookie
      localStorage.setItem("token", token);
      // Redirect to the home page after successful login
      setIsLoggedIn(true);
      
    })
    .catch((error)=>{
      console.error("Error logging in:",error);
    });
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  
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
            <div className="loginBox">
              <input placeholder="Email" className="loginInput" value={email} onChange={(e)=> setEmail(e.target.value)} />
              <input placeholder="Password" type="password" className="loginInput" value={password} onChange={(e)=> setPassword(e.target.value)} />
              <button className="loginButton" onClick={handleLogin}>Log In</button>
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton">
                <Link to="/register">Create a New Account</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }