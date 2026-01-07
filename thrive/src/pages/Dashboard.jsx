import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import "../styles/dashboard.css";

function Dashboard() {
  // 1. Set up state for habits
const [newHabit, setNewHabit] = useState(""); // For input field

const [habits, setHabits] = useState([
    { id: 1, name: "Drink Water", completed: false },
    { id: 2, name: "Walk 10 minutes", completed: false },
    { id: 3, name: "Stretch", completed: false },
]);

useEffect(() => {
    axios.get("http://localhost:5000/habits")
    .then(res => setHabits(res.data))
    .catch(err => console.log(err));
}, []);

const [selectedMood, setSelectedMood] = useState(null);
console.log(selectedMood);
  // 2. Toggle habit completion
const toggleHabit = (id) => {
    const updatedHabits = habits.map((habit) =>
    habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
};

const addHabitToServer = () => {
  if (newHabit.trim() === "") return; // ignore empty input

    axios
    .post("http://localhost:5000/habits", { name: newHabit })
    .then((res) => {
      setHabits([...habits, res.data]); // add habit from backend
      setNewHabit(""); // clear input
    })
    .catch((err) => console.log(err));
};

const weeklyData = [
    { day: "Mon", habitsCompleted: 2 },
    { day: "Tue", habitsCompleted: 3 },
    { day: "Wed", habitsCompleted: 2 },
    { day: "Thu", habitsCompleted: 3 },
    { day: "Fri", habitsCompleted: 3 },
    { day: "Sat", habitsCompleted: 1 },
    { day: "Sun", habitsCompleted: 2 },
];

return (
    <div className="dashboard">
    <header className="dashboard-header">
        <h2>Welcome back 👋</h2>
        <p>Today</p>
    </header>

      {/* Habits Section */}
    <section className="card habits">
<h3>Today’s Habits</h3>
<ul>
    {habits.map((habit) => (
    <li key={habit.id}>
        <input
        type="checkbox"
        checked={habit.completed}
        onChange={() => toggleHabit(habit.id)}
        />
        <span className={habit.completed ? "completed" : ""}>
        {habit.name}
        </span>
    </li>
    ))}
</ul>

  {/* Input + Add Button */}
<div className="add-habit">
        <input
            type="text"
            placeholder="New habit"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
        />
        <button onClick={addHabitToServer}>Add Habit</button>
</div>
</section>

    

      {/* Mood Section */}
    <section className="card mood">
        <h3>How are you feeling?</h3>
        <div className="moods">
        <span>😄</span>
        <span>🙂</span>
        <span>😐</span>
        <span>😕</span>
        <span>😔</span>
        </div>
    </section>
    <section className="card mood">
        <h3>How are you feeling?</h3>
        <div className="moods">
            {["😄", "🙂", "😐", "😕", "😔"].map((emoji, index) => (
            <span
                key={index}
                className={selectedMood === emoji ? "mood-selected" : ""}
                onClick={() => setSelectedMood(emoji)}
            >
                {emoji}
            </span>
            ))}
        </div>
    </section>

      {/* Progress Section */}
    <section className="card progress">
    <h3>Weekly Progress</h3>
    <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
        <LineChart data={weeklyData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="habitsCompleted" stroke="#7fb3a6" strokeWidth={3} />
        </LineChart>
        </ResponsiveContainer>
    </div>
</section>
    </div>
    );
}

export default Dashboard;
