import React from "react";

function Overview({ goals }) {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  const today = new Date();

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f0f0f0", margin: "1rem" }}>
      <h3>Overview</h3>
      <p>Total Goals: {goals.length}</p>
      <p>Total Saved: Ksh{totalSaved}</p>
      <p>Completed Goals: {completedGoals}</p>

      <h4>Status for Each Goal:</h4>
      <ul>
        {goals.map(goal => {
          const deadline = new Date(goal.deadline);
          const timeLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
          const isCompleted = goal.savedAmount >= goal.targetAmount;
          let statusText = "";

          if (isCompleted) {
            statusText = "Completed ✅";
          } else if (timeLeft < 0) {
            statusText = "Overdue ❌";
          } else if (timeLeft <= 30) {
            statusText = `${timeLeft} days left ⚠️`;
          } else {
            statusText = `${timeLeft} days left`;
          }

          return (
            <li key={goal.id}>
              <strong>{goal.name}</strong>: {statusText}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Overview;
