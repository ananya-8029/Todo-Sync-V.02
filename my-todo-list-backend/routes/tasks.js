const express = require("express");
const router = express.Router();
//middleware
const fetchuser = require("../middleware/fetchuser");
// Connecting to Tasks schema
const Task = require("../models/Tasks");

//Route 1: Get all the tasks using: GET "/api/tasks/fetchalltasks". Login required
router.get("/fetchalltasks", fetchuser, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Inernal Server error");
  }
});

//Route 2: Adding a new note using: POST "/api/tasks/addtask". Login required
router.post("/addtask", fetchuser, async (req, res) => {
  const { task, description, tag } = req.body;
  try {
    const newtask = new Task({
      task,
      description,
      tag,
      user: req.user.id,
    });
    const savedNote = await newtask.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

// Route 3: Deleting an existing task using: DELETE "api/tasks/deletetask/id". Login required
router.delete("/deletetask/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(401).send("Not Allowed");
    }

    //allow deletion only if user owns it
    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    task = await Task.findByIdAndDelete(req.params.id);
    res.json({ Success: "Task has beed deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

// Route 4: Making an existing task as completed using: POST "api/tasks/taskcomplete". Login required

router.post("/taskcomplete/:id", fetchuser, async (req, res) => {
  try {
    //find the task to be marked as completed
    let taskId = await Task.findById(req.params.id);
    if (!taskId) {
      return res.status(401).send("Wrong Id");
    }

    //allow deletion only if user owns it
    if (taskId.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: !taskId.completed },
      { new: true } // Return the updated task
    );
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task in MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
