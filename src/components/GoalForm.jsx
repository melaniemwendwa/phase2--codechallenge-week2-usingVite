import React, { useState } from "react";

function GoalForm({ setGoals, goals }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    savedAmount: 0,
    category: "",
    deadline: ""
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newGoal = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString()
    };

    fetch("http://localhost:3001/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal)
    })
      .then(res => res.json())
      .then(newGoal => {
        setGoals([...goals, newGoal]);
        
        setFormData({
          name: "",
          targetAmount: "",
          savedAmount: 0,
          category: "",
          deadline: ""
        });
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Goal</h3>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="targetAmount"
        type="number"
        placeholder="Target"
        value={formData.targetAmount}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <input
        name="deadline"
        type="date"
        value={formData.deadline}
        onChange={handleChange}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
