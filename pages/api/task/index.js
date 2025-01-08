// pages/api/task/index.js
import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";
import cors from "micro-cors";
const corsMiddleware = cors();
export default async function handler(req, res) {
  await corsMiddleware(req, res);
  await connectToDatabase();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        // Fetch tasks sorted by taskNumber in ascending order, excluding completed tasks
        const tasks = await Task.find({ completed: false }).sort({
          taskNumber: 1,
        });
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks" });
      }
      break;

    case "POST":
      try {
        // Before creating the task, we ensure the taskNumber is assigned
        const lastTask = await Task.findOne().sort({ taskNumber: -1 }); // Get the task with the highest taskNumber
        const taskNumber = lastTask ? lastTask.taskNumber + 1 : 1; // Increment taskNumber or start with 1

        const task = new Task({
          ...req.body,
          taskNumber, // Assign the task number here
        });

        await task.save(); // Save the new task
        res.status(201).json(task); // Return the created task with the assigned task number
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ message: error.message || "Failed to create task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
