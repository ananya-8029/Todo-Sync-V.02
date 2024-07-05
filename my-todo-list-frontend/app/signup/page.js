"use client";
import React, { useState } from "react";
import axios from "axios";
import "./page.css";
import Link from 'next/link'
import { useRouter } from "next/navigation";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router=useRouter();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_Backend_URL}/api/auth/createuser`, {
          name,
          email,
          password,
        },{
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if(response.data.error){
          alert(response.data.error)
        }
        else{
          alert("User created successfully");
          router.push("/login");
        }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <img className="logo" src="/images/logo.png" alt="" />
      <div className="signuppage">
        <div className="signupform">
          <h1>Get Started!</h1>
          <form action="POST">
            <div className="inputfield nameinputfield">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Type in your name"
              />
            </div>
            <div className="inputfield emailinputfield">
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

            <button className="signupbtn" onClick={submit} type="submit">
              Create Account
            </button>
          </form>
          <p>Already have an account? <Link href="/login"><span>Proceed to your account.</span></Link></p>
        </div>
      </div>
    </>
  );
};

export default Page;
