"use client";
import { useState } from "react";
import axios from "axios";
import "./Form.css";
import { connect } from "react-redux";
import { addTasks } from "../app/redux/reducer.js";
import { useRouter } from "next/navigation";

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (obj) => dispatch(addTasks(obj)),
  };
};
const Form = (props) => {
  //creating variables for storing title  and description
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        `${process.env.Backend_URL}/api/tasks/addtask`,
        {
          task,
          description,
          tag,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      if (response.data.error) {
        alert(response.data.error);
      } else {
        const { task, description, tag } = response.data;
        console.log(props.tasks)
        props.addTask({
          task: task,
          description: description,
          tag: tag,
        });
        console.log(props.tasks)
      }

      // Clear the form fields after successful submission
      setTask("");
      setDescription("");
      setTag("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="container">
        <form action="POST">
          <div className="task-input input-field">
            <label>Tasks</label>
            <input
              type="text"
              className="heading"
              value={task}
              onChange={(event) => {
                setTask(event.target.value);
              }}
              placeholder="What's the task you want to remember?"
            />
          </div>

          <div className="input-field">
            <label>Description</label>
            <input
              type="text"
              className="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              placeholder="What's the description of your task?"
            />
          </div>

          <div className="tag-input input-field">
            <label>Tag</label>
            <input
              type="text"
              className="tag"
              value={tag}
              onChange={(event) => {
                setTag(event.target.value);
              }}
              placeholder="Any specific tag"
            />
          </div>

          <button className="btn" onClick={handleSubmit}>
            ADD TASK
          </button>
        </form>
      </div>
    </>
  );
};

// connecting this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Form);
