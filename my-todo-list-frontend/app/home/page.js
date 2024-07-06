"use client";
import React, { useState, useEffect } from "react";
import "./page.css";
import axios from "axios";
import Form from "@/Components/Form";
import TaskBar from "@/Components/TaskBar";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import { addCompletedTask, addTasks, removeTasks } from "../redux/reducer.js";
import { FaEraser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import backendURL from "../backendURL";

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    user: state.user,
    completed: state.completed
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (obj) => dispatch(addTasks(obj)),
    removeTask: (id) => dispatch(removeTasks(id)),
    addCompletedTask: (id) => dispatch(addCompletedTask(id))
  };
};

const Page = (props) => {
  const router = useRouter();
  // const [expanded, setExpanded] = useState("false");
  const toggleDiv = () => {
    expansion();
    // setExpanded(!expanded);
  };

  const expansion = () => {
    const addTaskbtn = document.querySelector(".add-task-btn");
    const addbtn = document.querySelector(".add-btn");
    const form = document.querySelector(".form");

    const addTaskbtnHeight = addTaskbtn.offsetHeight;
    addTaskbtn.classList.add("expanded");
    form.style.display = "flex";
    addTaskbtn.style.height = 5 * addTaskbtnHeight + "px";
    addbtn.style.display = "none";

    document.body.addEventListener("click", outsideClickHandler);
  };

  const collapseDiv = () => {
    const addTaskbtn = document.querySelector(".add-task-btn");
    const addbtn = document.querySelector(".add-btn");
    const form = document.querySelector(".form");

    const addTaskbtnHeight = addTaskbtn.offsetHeight;
    addTaskbtn.classList.remove("expanded");
    form.style.display = "none";
    addTaskbtn.style.height = addTaskbtnHeight / 5 + "px";
    addbtn.style.display = "flex";

    // Remove click event listener from the document body
    document.body.removeEventListener("click", outsideClickHandler);
  };

  const outsideClickHandler = (event) => {
    const addTaskbtn = document.querySelector(".add-task-btn");
    const form = document.querySelector(".form");

    // Check if the click is outside the div and form
    if (!addTaskbtn.contains(event.target) && !form.contains(event.target)) {
      collapseDiv();
    }
  };
  // needs to be uncommented....
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authToken");
      // console.log(authToken)
      if (!authToken) {
        router.push("/login");
      }
    }
  }, []);

  const handleDelete = async (taskId) => {
    try {
      // console.log(taskId);
      const authToken = localStorage.getItem("authToken");
      const response = await axios.delete(
        `${backendURL.backendUrl}/api/tasks/deletetask/${taskId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      // Dispatch an action to remove the task from the Redux store
      props.removeTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
    } catch (error) {}
  };
  // console.log(props);
  return (
    <>
      <div className="main">
        <div className="dark-main">
          <img className="logo" src="/images/home-logo.png" alt="" />
          <div className="main-container">
            <div className="taskbar">
              <TaskBar />
            </div>
            <div className="notes-content">
              <div className="header"></div>
              <ul>
                {props.tasks.map((item) => {
                  return (
                    <li key={item._id}>
                      <div>
                        <h1>{item.task}</h1>
                        <p>{item.description}</p>
                      </div>
                      <div className="icons">
                        <button onClick={() => handleDelete(item._id)}>
                          <FaEraser
                            className="erase-icon"
                            style={{
                              color: "crimson",
                              fontSize: "1.2vmax",
                              cursor: "pointer",
                            }}
                          />
                        </button>
                        <button>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="star-icon"
                            style={{
                              fontSize: "1.2vmax",
                              cursor: "pointer",
                            }}
                          />
                        </button>
                        <button onClick={() => handleCompleteTask(item._id)}>
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className="completed-icon"
                            style={{
                              color: "#3e7c1f",
                              fontSize: "1.2vmax",
                              cursor: "pointer",
                            }}
                          />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="add-task-btn">
                <div className="add-btn" onClick={toggleDiv}>
                  <span>+</span>
                  <h1>ADD TASK</h1>
                </div>
                <div className="form">
                  <Form />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// connecting this component with redux store

const ConnectedPage = connect(mapStateToProps, mapDispatchToProps)(Page);

export default ConnectedPage;
