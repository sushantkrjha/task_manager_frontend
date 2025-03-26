import { useState, useEffect } from "react";
import { addTask, updateTask } from "../api/tasks";

const TaskForm = ({ onTaskAdded, onTaskUpdated, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [category, setCategory] = useState("Work");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setCompleted(editingTask.completed);
      setCategory(editingTask.category);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Title and Description cannot be empty.");
      return;
    }

    try {
      if (editingTask) {
        await updateTask(editingTask.id, { title, description, completed, category });
        onTaskUpdated();
        setEditingTask(null);  // Reset form after update
      } else {
        await addTask({ title, description, completed, category });
        onTaskAdded();
      }

      setTitle("");
      setDescription("");
      setCompleted(false);
      setCategory("Work");
    } catch (error) {
      console.error("Failed to save task", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />

      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" required></textarea>

      <label>
        <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
        Completed
      </label>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
      </select>

      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
      {editingTask && <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>}
    </form>
  );
};

export default TaskForm;