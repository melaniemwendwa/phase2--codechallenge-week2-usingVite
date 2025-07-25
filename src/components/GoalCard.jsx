import React, { useState } from "react";

function GoalCard({ goal, goals, setGoals }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(goal.name);
  const [targetAmount, setTargetAmount] = useState(goal.targetAmount);
  const [category, setCategory] = useState(goal.category);
  const [deadline, setDeadline] = useState(goal.deadline);

 
  const deadlineDate = new Date(goal.deadline);
  const today = new Date();
  const timeLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const isOverdue = timeLeft < 0 && goal.savedAmount < goal.targetAmount;

  // Format createdAt
  const createdAtFormatted = new Date(goal.createdAt).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  function handleDelete() {
    fetch(`http://localhost:3001/goals/${goal.id}`, {
      method: "DELETE"
    }).then(() => {
      const updated = goals.filter(g => g.id !== goal.id);
      setGoals(updated);
    });
  }

  function handleUpdate(e) {
    e.preventDefault();

    const updatedGoal = {
      ...goal,
      name,
      targetAmount: parseFloat(targetAmount),
      category,
      deadline
    };

    fetch(`http://localhost:3001/goals/${goal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedGoal)
    })
      .then(res => res.json())
      .then(data => {
        const updatedGoals = goals.map(g => (g.id === goal.id ? data : g));
        setGoals(updatedGoals);
        setIsEditing(false);
      });
  }

  return (
    <div className="goal-card">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
          <input value={category} onChange={(e) => setCategory(e.target.value)} />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h3>{goal.name}</h3>
          <p>Saved: Ksh{goal.savedAmount} / Ksh{goal.targetAmount}</p>
          <progress value={goal.savedAmount} max={goal.targetAmount}></progress>
          <p>{timeLeft > 0 ? `${timeLeft} days left` : isOverdue ? "Overdue!" : "Completed!"}</p>
          <p><strong>Category: </strong> {goal.category}</p>
          <p><strong>Created At:</strong> {createdAtFormatted}</p>
          <p><strong>Deadline:</strong> {goal.deadline}</p>
          <p><strong>Remaining: </strong>Ksh{goal.targetAmount - goal.savedAmount}</p>
          <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
          <button onClick={handleDelete} className="delete-btn">Delete</button>
        </>
      )}
    </div>
  );
}

export default GoalCard;
