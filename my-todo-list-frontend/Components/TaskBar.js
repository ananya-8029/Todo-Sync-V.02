"use client";
import React from "react";
import "./TaskBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faInfinity, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    user: state.user,
  };
};

const TaskBar = (props) => {

  return (
    <>
      <div className="profile">
        {props.user ? <h1>{props.user.name}</h1> : <h1></h1>}
      </div>
      <div className="status-of-tasks">
        <div className="status-important">
          <FontAwesomeIcon className="icons important-icon" icon={faStar} />
          <p>Important</p>
        </div>
        <div className="status-all">
        <FontAwesomeIcon className="icons all-icon" icon={faInfinity} />
          <p>All</p>
        </div>
        <div className="status-completed">
        <FontAwesomeIcon className="icons completed-icon" icon={faCheckDouble} />
          <p>Completed</p>
        </div>
      </div>
    </>
  );
};
export default connect(mapStateToProps, null)(TaskBar);
