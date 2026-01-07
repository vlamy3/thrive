import "../styles/dashboard.css";

function Dashboard() {
return (
    <div className="dashboard">
    <header className="dashboard-header">
        <h2>Welcome back 👋</h2>
        <p>Today</p>
    </header>

    <section className="card habits">
        <h3>Today’s Habits</h3>

        <ul>
            <li>
                <input type="checkbox" />
                Drink Water
            </li>
            <li>
                <input type="checkbox" />
                Walk 10 minutes
            </li>
            <li>
                <input type="checkbox" />
                Stretch
            </li>
        </ul>

        <button>Add Habit</button>
    </section>

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

    <section className="card progress">
        <h3>Weekly Progress</h3>
        <div className="chart-placeholder">[ Chart Here ]</div>
    </section>
    </div>
);
}

export default Dashboard;
