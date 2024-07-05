"use client"
import React,{ useState } from 'react'
import "./page.css";
import axios from "axios";

const page = () => {
    const [email, setEmail]=useState('')

    const submit = async (e) => {
      e.preventDefault();
      try {
        await axios
          .post("http://localhost:5000/login/forgotPassword", {
            email,
          })
          .then()
          .catch();
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <>
      <div id="container">
        <div className="main">
        <form action="POST">
          <h1>Forgot Password</h1>
          <p>You will recieve a reset link to the specified email.</p>
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

            <button className="fpbtn" onClick={submit}>Proceed</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default page
