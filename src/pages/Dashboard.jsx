import { useState, useContext } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { AuthContext } from "../context/AuthContext";
import "../styles/Dashboard.css"; // Import CSS

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  const refreshTasks = () => {
    setRefreshKey((prev) => prev + 1);
    setEditingTask(null);
  };

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div className="dashboard-header">
        <h2> Task Dashboard</h2>
        <button className="btn btn-danger btn-lg" onClick={logout}>
          Logout 
        </button>
      </div>

      {/* Content Section */}
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-primary text-white">{editingTask ? "✏️ Edit Task" : ""}</div>
            <div className="card-body">
              <TaskForm onTaskAdded={refreshTasks} onTaskUpdated={refreshTasks} editingTask={editingTask} setEditingTask={setEditingTask} />
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-dark text-white">Task List</div>
            <div className="card-body">
              <TaskList key={refreshKey} setEditingTask={setEditingTask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
