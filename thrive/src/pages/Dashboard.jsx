import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/dashboard.css";

function Dashboard() {
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState("");

  // 1️⃣ Fetch habits from backend on load
    useEffect(() => {
    axios
        .get("http://localhost:5000/habits")
        .then((res) => setHabits(res.data))
        .catch((err) => console.log(err));
    }, []);

  // 2️⃣ Add new habit
    const addHabitToServer = () => {
    if (newHabit.trim() === "") return;

    axios
        .post("http://localhost:5000/habits", { name: newHabit })
        .then((res) => {
        setHabits([...habits, res.data]);
        setNewHabit("");
        })
        .catch((err) => console.log(err));
    };

  // 3️⃣ Toggle habit completion
    const toggleHabitOnServer = (id) => {
    axios
        .patch(`http://localhost:5000/habits/${id}`)
        .then((res) => {
        const updated = habits.map((h) => (h._id === id ? res.data : h));
        setHabits(updated);
        })
        .catch((err) => console.log(err));
    };

    return (
    <div className="dashboard">
        <section className="card habits">
        <h3>Today’s Habits</h3>
        <ul>
            {habits.map((habit) => (
            <li key={habit._id}>
                <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabitOnServer(habit._id)}
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
            onKeyDown={(e) => e.key === "Enter" && addHabitToServer()}
            />
            <button onClick={addHabitToServer}>Add Habit</button>
        </div>
        </section>

      {/* Example: Weekly Progress Chart (placeholder) */}
        <section className="card chart">
            <h3>Weekly Progress</h3>
            <ResponsiveContainer width="100%" height={200}>
            <LineChart data={habits.map((h, i) => ({ name: `Day ${i + 1}`, completed: h.completed ? 1 : 0 }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#7fb3a6" />
            </LineChart>
            </ResponsiveContainer>
        </section>
        </div>
    );
}

export default Dashboard;
