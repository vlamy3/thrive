import { useState } from "react";
const [selectedMood, setSelectedMood] = useState(null);
import "../styles/dashboard.css";

function Dashboard() {
  // 1. Set up state for habits
const [habits, setHabits] = useState([
    { id: 1, name: "Drink Water", completed: false },
    { id: 2, name: "Walk 10 minutes", completed: false },
    { id: 3, name: "Stretch", completed: false },
]);

  // 2. Toggle habit completion
const toggleHabit = (id) => {
    const updatedHabits = habits.map((habit) =>
    habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
};

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
        <button>Add Habit</button>
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
        <div className="chart-placeholder">[ Chart Here ]</div>
    </section>
    </div>
    

);
}

export default Dashboard;
