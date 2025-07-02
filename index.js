const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const Task = require("./models/Task")

// Middlewares
app.use(cors())
app.use(express.json())

// MongoDB Connect (Local)
mongoose.connect("mongodb://127.0.0.1:27017/taskDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Error connecting to DB:", err))

// Routes

// ➕ Create Task
app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).send({ message: "Task Created", task })
  } catch (error) {
    res.status(400).send({ error: "Failed to create task" })
  }
})

// 📥 Read All Tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find()
  res.send(tasks)
})

// ✏️ Update Task
app.put("/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.send({ message: "Task Updated", updated })
})

// ❌ Delete Task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.send({ message: "Task Deleted" })
})

// Start Server
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000")
})
