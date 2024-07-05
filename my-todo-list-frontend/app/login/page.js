"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./page.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducer.js';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (obj) => dispatch(setUser(obj)),
  };
};

const Page = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error) {
        alert(response.data.error);
      } else {
        const { authToken, user } = response.data;
        // Set the expiration time
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds
        // const expirationDate = new Date(expirationTime)
        // console.log(expirationDate)

        // Store user data in Redux
        console.log(user)
        props.setUser(user)

        localStorage.setItem("authToken", authToken);
        localStorage.setItem("authTokenExpiration", expirationTime);

        // Include the token in the headers for subsequent requests
        axios.defaults.headers.common["auth-token"] = authToken;
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const expirationTime = localStorage.getItem("authTokenExpiration");
    // console.log(authToken);
    const expirationDate = new Date(expirationTime);
    // console.log(expirationTime);

    if (!authToken) {
      handleSubmit();
    } else {
      if (new Date().getTime() > parseInt(expirationTime, 10)) {
        localStorage.removeItem("authTokenExpiration");
        localStorage.removeItem("authToken");
        handleSubmit();
      } else {
        router.push("/home");
      }
    }
  }, [router]);

  return (
    <>
      <img className="logo" src="/images/logo.png" alt="" />
      <div className="loginPage">
        <div className="loginForm">
          <h1>Proceed To Login</h1>
          <form action="POST">
            <div className="inputfield emailinput">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Type in your email"
              />
            </div>

            <div className="inputfield">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Key your password"
              />
            </div>
            <span>
              <Link href="/login/forgotPassword">Forgot Password</Link>
            </span>
            <button className="loginbtn" onClick={submit}>
              Proceed
            </button>
            <p>
              New User?{" "}
              <Link href="/signup">
                <span>Create an Account.</span>
              </Link>
            </p>
          </form>
        </div>
        <div className="bgImg">
          <img src="/images/loginBg1.jfif" alt="" />
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);