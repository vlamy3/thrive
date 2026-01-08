// src/backend/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./.env" });

// 1️⃣ Initialize Express app
const app = express();

// 2️⃣ Middleware
app.use(cors());
app.use(express.json());

// 3️⃣ MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// 4️⃣ Define Habit schema + model
const HabitSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

const Habit = mongoose.model("Habit", HabitSchema);

// 5️⃣ Routes

// Root route (optional, browser friendly)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Get all habits
app.get("/habits", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add new habit
app.post("/habits", async (req, res) => {
  try {
    const habit = new Habit({
      name: req.body.name,
      completed: false,
    });
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Toggle habit completion
app.patch("/habits/:id", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    habit.completed = !habit.completed;
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 6️⃣ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
