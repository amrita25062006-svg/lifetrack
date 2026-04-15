import React, { useState } from "react";
import "./App.css";
import { FaMoon, FaTint, FaRunning, FaMobileAlt, FaSmile } from "react-icons/fa";
import HealthCharts from "./HealthCharts";
import HealthProgress from "./HealthProgress";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");
  const [exercise, setExercise] = useState("");
  const [screen, setScreen] = useState("");
  const [stress, setStress] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState("dashboard");
const addUser = () => {
  if (!name || !age) {
    alert("Please fill name and age");
    return;
  }

  const data = {
    name: name,
    age: Number(age),
    gender: "Other",
    email: `${name.toLowerCase().replace(/\s+/g, "")}@demo.com`,
    phone: "9999999999"
  };

  console.log("Sending user:", data);

  axios.post("http://127.0.0.1:8000/api/users/", data)
    .then(() => {
      return axios.get("http://127.0.0.1:8000/api/users/");
    })
    .then((res) => {
      setUsers(res.data);
      setName("");
      setAge("");
      alert("User added!");
    })
    .catch((err) => {
      console.log("USER ERROR:", err.response?.data || err.message);
      alert("Error adding user");
    });
};



const addLog = () => {
  if (!selectedUser) {
    alert("Please select a user");
    return;
  }

  if (!sleep || !water || !exercise || !screen || !stress) {
    alert("Please fill all fields!");
    return;
  }

  const data = {
    user: Number(selectedUser),
    sleep_hours: Number(sleep),
    water_intake: Number(water),
    exercise_minutes: Number(exercise),
    screen_time_hours: Number(screen),
    stress_level: Number(stress),
    date: new Date().toISOString().split("T")[0]
  };

  axios.post("http://127.0.0.1:8000/api/logs/", data)
    .then(() => axios.get("http://127.0.0.1:8000/api/logs/"))
    .then((res) => {
      setLogs(res.data);
      setSleep("");
      setWater("");
      setExercise("");
      setScreen("");
      setStress("");
      alert("Log added!");
    })
    .catch((err) => {
      console.log("ERROR:", err.response?.data || err.message);
      alert("Error adding log");
    });
};
  useEffect(() => {
  axios.get("https://lifetrack-s3i2.onrender.com/api/users/")
    .then(res => setUsers(res.data));

  axios.get("https://lifetrack-s3i2.onrender.com/api/logs/")
    .then(res => setLogs(res.data));
}, []);
   const filteredLogs = selectedUser
  ? logs.filter((log) => Number(log.user) === Number(selectedUser))
  : logs;

const latestLog =
  filteredLogs.length > 0 ? filteredLogs[filteredLogs.length - 1] : null;

const currentSleep = latestLog ? Number(latestLog.sleep_hours) : 0;
const currentWater = latestLog ? Number(latestLog.water_intake) : 0;
const currentExercise = latestLog ? Number(latestLog.exercise_minutes) : 0;

const avgSleep =
  filteredLogs.length > 0
    ? (
        filteredLogs.reduce((sum, log) => sum + Number(log.sleep_hours), 0) /
        filteredLogs.length
      ).toFixed(1)
    : 0;

const weeklyAvgSleep =
  filteredLogs.length > 0
    ? (
        filteredLogs.reduce((sum, log) => sum + Number(log.sleep_hours), 0) /
        filteredLogs.length
      ).toFixed(1)
    : 0;

const weeklyTotalExercise =
  filteredLogs.length > 0
    ? filteredLogs.reduce((sum, log) => sum + Number(log.exercise_minutes), 0)
    : 0;

const weeklyAvgStress =
  filteredLogs.length > 0
    ? (
        filteredLogs.reduce((sum, log) => sum + Number(log.stress_level), 0) /
        filteredLogs.length
      ).toFixed(1)
    : 0;

const getSuggestions = () => {
  if (!filteredLogs.length) return ["Start logging your health data!"];

  const latest = filteredLogs[filteredLogs.length - 1];
  let tips = [];

  if (latest.sleep_hours < 7) tips.push("🛌 Try to sleep at least 7-8 hours");
  if (latest.water_intake < 2) tips.push("💧 Drink more water today");
  if (latest.exercise_minutes < 30) tips.push("🏃 Add at least 30 mins of exercise");
  if (latest.screen_time_hours > 6) tips.push("📵 Reduce screen time");
  if (latest.stress_level > 6) tips.push("🧘 Try meditation or relaxation");

  return tips;
};

const calculateHealthScore = () => {
  if (!filteredLogs.length) return 0;

  const latest = filteredLogs[filteredLogs.length - 1];
  let score = 100;

  if (latest.sleep_hours < 7) score -= 15;
  if (latest.water_intake < 2) score -= 15;
  if (latest.exercise_minutes < 30) score -= 20;
  if (latest.screen_time_hours > 6) score -= 10;
  if (latest.stress_level > 6) score -= 20;

  return score;
};

const getAlerts = () => {
  if (!filteredLogs.length) return [];

  const latest = filteredLogs[filteredLogs.length - 1];
  let alerts = [];

  if (latest.sleep_hours < 6) alerts.push("⚠️ Low Sleep Detected");
  if (latest.stress_level > 7) alerts.push("🚨 High Stress Level");
  if (latest.water_intake < 1.5) alerts.push("💧 Dehydration Risk");

  return alerts;
};



  return (
    <div className="app">

      {/* Sidebar */}
      <div className="sidebar">
       <div className="logo">
       <span className="logo-icon">💙</span>
       <span>Vita<span style={{color:"#6366f1"}}>Track</span></span>
      </div> 

        <div className="menu">
          <p className={`menu-item ${page === "dashboard" ? "active" : ""}`} onClick={() => setPage("dashboard")}>Dashboard</p>
          <p className={`menu-item ${page === "logs" ? "active" : ""}`} onClick={() => setPage("logs")}>Health Logs</p>
        <p className={`menu-item ${page === "analytics" ? "active" : ""}`} onClick={() => setPage("analytics")}>Analytics</p>
          <p className={`menu-item ${page === "settings" ? "active" : ""}`} onClick={() => setPage("settings")}>Settings</p>
        </div>
      </div>
    
      {/* Main */}
      <div className="main">

  <div className="alerts">
    {getAlerts().map((a, i) => (
      <div key={i} className="alert-box">{a}</div>
    ))}
  </div>

  <div className="topbar">
    <h1>Health Monitoring Dashboard</h1>
  </div>

  {/* DASHBOARD */}
{page === "dashboard" && (
  <>
    <select
      value={selectedUser}
      onChange={(e) => setSelectedUser(e.target.value)}
    >
      <option value="">All Users</option>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>

    <div className="metrics">
      <div className="card sleep">
        <FaMoon className="icon" />
        <h3>Sleep</h3>
        <p>{avgSleep} hrs</p>
      </div>

      <div className="card water">
        <FaTint className="icon" />
        <h3>Water</h3>
        <p>{filteredLogs.length ? filteredLogs[filteredLogs.length - 1].water_intake : 0} L</p>
      </div>

      <div className="card exercise">
        <FaRunning className="icon" />
        <h3>Exercise</h3>
        <p>{filteredLogs.length ? filteredLogs[filteredLogs.length - 1].exercise_minutes : 0} min</p>
      </div>

      <div className="card screen">
        <FaMobileAlt className="icon" />
        <h3>Screen</h3>
        <p>{filteredLogs.length ? filteredLogs[filteredLogs.length - 1].screen_time_hours : 0} hrs</p>
      </div>

      <div className="card stress">
        <FaSmile className="icon" />
        <h3>Stress</h3>
        <p>{filteredLogs.length ? filteredLogs[filteredLogs.length - 1].stress_level : 0} / 10</p>
      </div>
    </div>

    <HealthProgress
      sleep={currentSleep}
      water={currentWater}
      exercise={currentExercise}
    />

    <HealthCharts logs={filteredLogs} />

    <div className="insights">
      <h2>AI Health Suggestions</h2>
      <ul>
        {getSuggestions().map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>

    <div className="health-score">
      <h2>Overall Health Score</h2>
      <div className="score-circle">
        {filteredLogs.length === 0 ? "No data" : calculateHealthScore()}
      </div>
      <p>
        {filteredLogs.length === 0
          ? "Start adding logs"
          : calculateHealthScore() > 80
          ? "🔥 Excellent health!"
          : calculateHealthScore() > 50
          ? "👍 Good, but can improve"
          : "⚠️ Needs attention"}
      </p>
    </div>

    <div className="weekly-analytics">
      <h2>Weekly Analytics</h2>
      <div className="weekly-grid">
        <div className="mini-stat">
          <h3>Avg Sleep</h3>
          <p>{weeklyAvgSleep} hrs</p>
        </div>

        <div className="mini-stat">
          <h3>Total Exercise</h3>
          <p>{weeklyTotalExercise} min</p>
        </div>

        <div className="mini-stat">
          <h3>Avg Stress</h3>
          <p>{weeklyAvgStress} / 10</p>
        </div>
      </div>
    </div>
  </>
)}


{/* LOGS PAGE */}
{page === "logs" && (
  <div className="logs-page">
    <h2>Add Health Log</h2>

    <select
      value={selectedUser}
      onChange={(e) => setSelectedUser(e.target.value)}
    >
      <option value="">Select User</option>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>

    <input
      type="number"
      placeholder="Sleep Hours"
      value={sleep}
      onChange={(e) => setSleep(e.target.value)}
    />

    <input
      type="number"
      placeholder="Water Intake (L)"
      value={water}
      onChange={(e) => setWater(e.target.value)}
    />

    <input
      type="number"
      placeholder="Exercise Minutes"
      value={exercise}
      onChange={(e) => setExercise(e.target.value)}
    />

    <input
      type="number"
      placeholder="Screen Time"
      value={screen}
      onChange={(e) => setScreen(e.target.value)}
    />

    <input
      type="number"
      placeholder="Stress Level (1-10)"
      value={stress}
      onChange={(e) => setStress(e.target.value)}
    />

    <button onClick={addLog}>Add Log</button>

    <h3 style={{ marginTop: "24px" }}>Recent Logs</h3>

    <div className="logs-table">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Sleep</th>
            <th>Water</th>
            <th>Exercise</th>
            <th>Screen</th>
            <th>Stress</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {logs
            .filter((log) =>
              selectedUser ? Number(log.user) === Number(selectedUser) : true
            )
            .slice(-5)
            .reverse()
            .map((log) => {
              const matchedUser = users.find(
                (u) => Number(u.id) === Number(log.user)
              );

              return (
                <tr key={log.id}>
                  <td>{matchedUser ? matchedUser.name : `User ${log.user}`}</td>
                  <td>{log.sleep_hours}</td>
                  <td>{log.water_intake}</td>
                  <td>{log.exercise_minutes}</td>
                  <td>{log.screen_time_hours}</td>
                  <td>{log.stress_level}</td>
                  <td>{log.date}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  </div>
)}

  {/* ANALYTICS */}
{page === "analytics" && (
  <div className="weekly-analytics">
    <h2>Analytics</h2>

    <select
      value={selectedUser}
      onChange={(e) => setSelectedUser(e.target.value)}
    >
      <option value="">All Users</option>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>

    <p>
      Viewing:{" "}
      {selectedUser
        ? users.find((u) => Number(u.id) === Number(selectedUser))?.name
        : "All Users"}
    </p>

    <HealthCharts logs={filteredLogs} />

    <div className="weekly-grid">
      <div className="mini-stat">
        <h3>Avg Sleep</h3>
        <p>{weeklyAvgSleep} hrs</p>
      </div>

      <div className="mini-stat">
        <h3>Total Exercise</h3>
        <p>{weeklyTotalExercise} min</p>
      </div>

      <div className="mini-stat">
        <h3>Avg Stress</h3>
        <p>{weeklyAvgStress} / 10</p>
      </div>
    </div>
  </div>
)}

  {/* SETTINGS */}
{page === "settings" && (
  <div>
    <h2>Add User</h2>

    <input
  type="text"
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<input
  type="number"
  placeholder="Age"
  value={age}
  onChange={(e) => setAge(e.target.value)}
/>

    <button onClick={addUser}>Add User</button>

    <h3>Users:</h3>
    {users.map((u, i) => (
      <p key={i}>{u.name} ({u.age})</p>
    ))}

  </div>
)}

      </div>
    </div>
  );
}

export default App;