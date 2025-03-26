import { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../api/tasks";
import "../styles/TaskList.css"; // Import CSS

const TaskList = ({ setEditingTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error loading tasks", error);
      }
    };

    loadTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="task-list">
      <h3 className="text-center"> Task List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.category}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-1" onClick={() => setEditingTask(task)}>
                   Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>
                   Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
