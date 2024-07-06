"use client";
import config from "../config";
import { setUser } from "./reducer";
import { addTasks } from "./reducer"

export const fetchUser = () => async (dispatch) => {
  try {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authToken");
      console.log(authToken)
      // Fetch user data from the server
      const response = await fetch(`${config.backendUrl}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      if (!response.ok) {
        console.error(
          "Failed to fetch user data:",
          response.status,
          response.statusText
        );
        return;
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const userData = await response.json();
        // Dispatch action to set user in Redux store
        dispatch(setUser(userData));
      } else {
        console.error("Unexpected response content type:", contentType);
      }
    }
  } catch (error) {
    console.error("Error fetching user data", error);
  }
};

export const fetchTasks = () => async (dispatch) => {
  try {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authToken");
      // console.log(authToken)
      // Fetch user data from the server
      const response = await fetch(`${config.backendUrl}/api/tasks/fetchalltasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      if (!response.ok) {
        console.error(
          "Failed to fetch tasks:",
          response.status,
          response.statusText
        );
        return;
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const taskData = await response.json();
        // Dispatch action to set user in Redux store
        taskData.map((item)=>{
          dispatch(addTasks(item));
        })
      } else {
        console.error("Unexpected response content type:", contentType);
      }
    }
  } catch (error) {
    console.error("Error fetching user tasks", error);
  }
};
