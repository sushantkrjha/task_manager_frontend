import { useState, useContext } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  const refreshTasks = () => {
    setRefreshKey((prev) => prev + 1); // Triggers re-render to refresh task list
    setEditingTask(null); // Reset editing mode after update
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      {/* Task Form: Handles Adding and Updating Tasks */}
      <TaskForm 
        onTaskAdded={refreshTasks} 
        onTaskUpdated={refreshTasks} 
        editingTask={editingTask} 
        setEditingTask={setEditingTask}
      />

      {/* Task List: Allows selecting a task for editing */}
      <TaskList key={refreshKey} setEditingTask={setEditingTask} />
    </div>
  );
};

export default Dashboard;