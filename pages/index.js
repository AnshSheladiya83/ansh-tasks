import React, { useState, useEffect } from "react";
import axios from "axios";

// Load base URL from environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://ansh-tasks.netlify.app";

const QueueSystem = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/task`);
      setTasks(response.data); // Assuming the response data is an array of tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (taskName.trim()) {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/task`, {
          name: taskName,
        });
        setTasks([...tasks, response.data]); // Add the new task to the local state
        setTaskName("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Mark the current task as completed
  const completeTask = async () => {
    if (tasks.length > 0) {
      const [currentTask, ...remainingTasks] = tasks;
      try {
        await axios.put(`${API_BASE_URL}/api/task/${currentTask._id}`, {
          completed: true,
        });
        setTasks(remainingTasks); // Remove the completed task locally
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Queue</h1>
      {/* Task Creation */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTask}
          className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Current Task */}
      <div className="mb-6">
        {tasks.length > 0 ? (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Current Task:</h2>
            <p className="text-blue-700 font-medium">{tasks[0].name}</p>
            <button
              onClick={completeTask}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Mark as Completed
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No tasks in the queue.</p>
        )}
      </div>
      {/* Remaining Tasks */}
      {/* <div>
        <h2 className="text-lg font-semibold mb-2">Remaining Tasks:</h2>
        <ul className="space-y-2">
          {tasks.slice(1).map((task, index) => (
            <li
              key={task._id || index}
              className="p-2 bg-gray-200 rounded-lg text-gray-700"
            >
              {task.name}
            </li>
          ))}
          {tasks.length <= 1 && (
            <p className="text-gray-500">No remaining tasks.</p>
          )}
        </ul>
      </div> */}
    </div>
  );
};

export default QueueSystem;
