import { useState, useEffect } from "react";
import { addTask, updateTask } from "../api/tasks";
import "../styles/TaskForm.css"; // Import CSS

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
        setEditingTask(null);
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
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        className="form-control"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />

      <textarea
        className="form-control"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        required
      ></textarea>

      <label className="form-check-label">
        <input
          type="checkbox"
          className="form-check-input"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>

      <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
      </select>

      <button type="submit" className="btn btn-primary btn-block">
        {editingTask ? "Update Task" : "Add Task"}
      </button>

      {editingTask && (
        <button type="button" className="btn btn-secondary btn-block mt-2" onClick={() => setEditingTask(null)}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
