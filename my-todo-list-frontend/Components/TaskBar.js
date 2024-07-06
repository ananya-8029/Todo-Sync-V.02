"use client";
import React from "react";
import "./TaskBar.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    user: state.user,
  };
};

const TaskBar = (props) => {
  const handleLogOut = ()=>{
    console.log("Log out clicked")
  }
  return (
    <>
      <div className="profile">
        {props.user ? <h1>{props.user.name}</h1> : <h1></h1>}
      </div>
      <div className="status-of-tasks">
        <div className="status-of-task-subcontainer">
          {" "}
          <div className="status-important">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="rgba(38,153,81,1)"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502V15.968ZM12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
            </svg>
            <p>Important</p>
          </div>
          <div className="status-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="rgba(225,65,11,1)"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M3 12C3 10.067 4.567 8.5 6.5 8.5C7.7035 8.5 8.51959 8.9338 9.19914 9.61336C9.9255 10.3397 10.4851 11.3322 11.1258 12.4856L11.1595 12.5462C11.7605 13.6283 12.4431 14.8573 13.3866 15.8009C14.3946 16.8088 15.7035 17.5 17.5 17.5C20.5376 17.5 23 15.0376 23 12C23 8.96243 20.5376 6.5 17.5 6.5C15.8394 6.5 14.3508 7.2359 13.3423 8.39937C13.7887 9.05406 14.1574 9.70577 14.464 10.2574C15.0681 9.20718 16.2014 8.5 17.5 8.5C19.433 8.5 21 10.067 21 12C21 13.933 19.433 15.5 17.5 15.5C16.2965 15.5 15.4804 15.0662 14.8009 14.3866C14.0745 13.6603 13.5149 12.6678 12.8742 11.5144L12.8405 11.4538C12.2395 10.3717 11.5569 9.14265 10.6134 8.19914C9.60541 7.1912 8.2965 6.5 6.5 6.5C3.46243 6.5 1 8.96243 1 12C1 15.0376 3.46243 17.5 6.5 17.5C8.16056 17.5 9.64923 16.7641 10.6577 15.6006C10.2113 14.9459 9.84262 14.2942 9.53605 13.7426C8.93194 14.7928 7.79856 15.5 6.5 15.5C4.567 15.5 3 13.933 3 12Z"></path>
            </svg>
            <p>All</p>
          </div>
          <div className="status-completed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="rgba(90,190,129,1)"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path>
            </svg>
            <p>Completed</p>
          </div>
        </div>

        <div className="log-outbtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="rgba(71,100,77,1)"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM7 11V8L2 12L7 16V13H15V11H7Z"></path>
          </svg>
          <p onClick={handleLogOut}>Log Out</p>
        </div>
      </div>
    </>
  );
};
export default connect(mapStateToProps, null)(TaskBar);
