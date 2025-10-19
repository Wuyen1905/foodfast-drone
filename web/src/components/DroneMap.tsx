import React from "react";

const DroneMap = ({ path = [] }: { path?: string[] }) => {
  if (path.length === 0) return null;
  return (
    <div style={{ marginTop: 10, padding: 10, background: "#fafafa", borderRadius: 6 }}>
      <h5>Hành trình Drone:</h5>
      <ul>
        {path.map((p, idx) => (
          <li key={idx}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default DroneMap;
