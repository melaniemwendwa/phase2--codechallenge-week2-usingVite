import React, { useState } from "react";

function DepositForm({ goals, setGoals }) {
  const [amount, setAmount] = useState("");
  const [goalId, setGoalId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const selectedGoal = goals.find(g => String(g.id) === goalId);

    // Check if the goal was found
    if (!selectedGoal) {
      alert("Please select a valid goal before depositing.");
      return;
    }

    const updatedAmount = Number(selectedGoal.savedAmount) + Number(amount);

    fetch(`http://localhost:3001/goals/${goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedAmount })
    })
      .then(res => res.json())
      .then(updatedGoal => {
        const updatedGoals = goals.map(g =>
          g.id === updatedGoal.id ? updatedGoal : g
        );
        setGoals(updatedGoals);
        setAmount("");
        setGoalId(""); 
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Make a Deposit</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />
      <select value={goalId} onChange={e => setGoalId(e.target.value)} required>
        <option value="">Select Goal</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
