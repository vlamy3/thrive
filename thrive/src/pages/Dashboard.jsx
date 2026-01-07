// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";

function Dashboard() {
  // 1️⃣ State
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  // 2️⃣ Fetch habits on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/habits")
      .then((res) => setHabits(res.data))
      .catch((err) => console.error("Error fetching habits:", err));
  }, []);

  // 3️⃣ Toggle habit completion
  const toggleHabit = (id) => {
    axios
      .patch(`http://localhost:5000/habits/${id}`)
      .then((res) => {
        setHabits(habits.map((h) => (h._id === id ? res.data : h)));
      })
      .catch((err) => console.error("Error toggling habit:", err));
  };

  // 4️⃣ Render
  return (
    <section className="card habits">
      <h3>Today’s Habits</h3>

      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => toggleHabit(habit._id)}
            />
            <span className={habit.completed ? "completed" : ""}>
              {habit.name}
            </span>
          </li>
        ))}
      </ul>

      {/* Add Habit */}
      <div className="add-habit">
        <input
          type="text"
          placeholder="New habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button
          onClick={() => {
            if (newHabit.trim() === "") return;

            axios
              .post("http://localhost:5000/habits", { name: newHabit })
              .then((res) => {
                setHabits([...habits, res.data]);
                setNewHabit("");
              })
              .catch((err) => console.error("Error adding habit:", err));
          }}
        >
          Add Habit
        </button>
      </div>
    </section>
  );
}

export default Dashboard;
