/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Habit schema
const habitSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
});

const Habit = mongoose.model("Habit", habitSchema);

// Routes
app.get("/habits", async (req, res) => {
    const habits = await Habit.find();
    res.json(habits);
});

app.post("/habits", async (req, res) => {
    const { name } = req.body;
    const newHabit = new Habit({ name, completed: false });
    await newHabit.save();
    res.json(newHabit);
});

app.patch("/habits/:id", async (req, res) => {
    const { id } = req.params;
    const habit = await Habit.findById(id);
    habit.completed = !habit.completed;
    await habit.save();
    res.json(habit);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
