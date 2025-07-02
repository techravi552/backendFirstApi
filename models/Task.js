// models/Task.js
const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  dueDate: Date,
  image: String
})

const Task = mongoose.model("Task", TaskSchema)
module.exports = Task
