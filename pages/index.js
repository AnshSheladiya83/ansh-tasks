// QueueSystem.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../elements/atoms/Title";
import CurrentTask from "@/elements/CurrentTask";
import CreateTask from "@/elements/CreateTask";
import RemainingTasks from "@/elements/RemainingTasks";
import TotalTasksCard from "@/elements/TotalTasksCard";
import TasksListCard from "@/elements/TasksListCard";

const QueueSystem = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [todayTasks, setTodayTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/task`);
      setTasks(response.data); // Assuming the response data is an array of tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch today's tasks and total count
  const fetchTodayTasks = async () => {
    try {
      const response = await axios.get(`/api/task/today`);
      setTodayTasks(response.data.todayTasks);
      setTotalTasks(response.data.totalTasks);
    } catch (error) {
      console.error("Error fetching today's tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchTodayTasks(); // Fetch today's tasks and count
  }, []);

  // Mark the current task as completed
  const completeTask = async () => {
    if (tasks.length > 0) {
      const [currentTask, ...remainingTasks] = tasks;
      try {
        await axios.put(`/api/task/${currentTask._id}`, {
          completed: true,
        });
        setTasks(remainingTasks); // Remove the completed task locally
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }
  };

  return (
    <div className="p-8 max-w-screen-lg mx-auto bg-white space-y-5 lg:space-y-8">
      <Title />
      {/* Today's Total Tasks Card */}
      {/* <div className="flex justify-center lg:justify-start">
        <TotalTasksCard totalTasks={totalTasks} />
      </div> */}
            {/* Current Task */}
            <div className="mb-6">
        {tasks.length > 0 ? (
          <CurrentTask task={tasks[0]} completeTask={completeTask} />
        ) : (
          <p className="text-gray-500"></p>
        )}
      </div>
      {/* Task Creation */}
      <CreateTask
        taskName={taskName}
        setTaskName={setTaskName}
        tasks={tasks}
        setTasks={setTasks}
      />

      {/* Responsive Layout: For large screens (desktop) use grid or flex */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks List Card */}
        {/* <div className="flex justify-center lg:justify-start">
          <TasksListCard tasks={todayTasks} />
        </div> */}
        {/* Remaining Tasks */}
        {/* <RemainingTasks tasks={tasks} />{" "} */}
      </div>

      {/* Pass the tasks to RemainingTasks component */}
    </div>
  );
};

export default QueueSystem;
