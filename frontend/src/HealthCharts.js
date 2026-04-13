import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function HealthCharts({ logs }) {

  const data = logs.map((log, index) => ({
    day: `Day ${index + 1}`,
    sleep: log.sleep_hours,
    water: log.water_intake,
    stress: log.stress_level
  }));

  return (
    <div className="chart-container">

      <h2>📊 Health Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />
          <YAxis />

          <Tooltip />

          <Line type="monotone" dataKey="sleep" stroke="#6C63FF" strokeWidth={3}/>
          <Line type="monotone" dataKey="water" stroke="#00C9A7" strokeWidth={3}/>
          <Line type="monotone" dataKey="stress" stroke="#FF6B6B" strokeWidth={3}/>

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default HealthCharts;