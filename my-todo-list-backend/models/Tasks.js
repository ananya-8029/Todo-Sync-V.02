const mongoose = require("mongoose");
const { Schema } = mongoose;

const tasksSchema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user", //user model in User.js
  },
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("tasks", tasksSchema);
