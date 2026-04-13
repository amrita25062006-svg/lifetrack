import React from "react";

function HealthProgress({ sleep, water, exercise }) {
  const sleepPercent = Math.min((sleep / 8) * 100, 100);
  const waterPercent = Math.min((water / 3) * 100, 100);
  const exercisePercent = Math.min((exercise / 60) * 100, 100);

  return (
    <div className="rings-container">
      <div className="ring-card">
        <div
          className="ring sleep-ring"
          style={{
            background: `conic-gradient(#7c83fd 0% ${sleepPercent}%, #1f2937 ${sleepPercent}% 100%)`
          }}
        >
          <span>{sleep}h</span>
        </div>
        <p>Sleep</p>
      </div>

      <div className="ring-card">
        <div
          className="ring water-ring"
          style={{
            background: `conic-gradient(#38bdf8 0% ${waterPercent}%, #1f2937 ${waterPercent}% 100%)`
          }}
        >
          <span>{water}L</span>
        </div>
        <p>Water</p>
      </div>

      <div className="ring-card">
        <div
          className="ring exercise-ring"
          style={{
            background: `conic-gradient(#34d399 0% ${exercisePercent}%, #1f2937 ${exercisePercent}% 100%)`
          }}
        >
          <span>{exercise}m</span>
        </div>
        <p>Exercise</p>
      </div>
    </div>
  );
}

export default HealthProgress;