import React from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming the Input component exists in your ShadeCN library
import { Button } from "@/components/ui/button"; // Assuming the Button component exists in your ShadeCN library

const CreateTask = ({ taskName, setTaskName, tasks, setTasks }) => {
  // Add a new task
  const addTask = async () => {
    if (taskName.trim()) {
      try {
        const response = await axios.post(`/api/task`, {
          name: taskName,
        });
        setTasks([...tasks, response.data]); // Add the new task to the local state
        setTaskName("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
        <CardDescription>
          Enter the task details below to add a new task to the queue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="">
          <Input
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full" // You can apply additional styles here if needed
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={addTask}
          className=""
        >
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateTask;
