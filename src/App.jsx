import "./App.css";
import { useState, useEffect } from "react";
import Overview from "./components/Overview";
import GoalForm from "./components/GoalForm";
import DepositForm from "./components/DepositForm";
import GoalCard from "./components/GoalCard";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then(res => res.json())
      .then(data => setGoals(data));
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Smart Goal Planner</h1>
      <Overview goals={goals} />

      <div className="forms-row">
        <GoalForm setGoals={setGoals} goals={goals} />
        <DepositForm goals={goals} setGoals={setGoals} />
      </div>

      <div className="goals-container">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} setGoals={setGoals} goals={goals} />
        ))}
      </div>
    </div>
  );
}

export default App;
