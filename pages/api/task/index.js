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
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Failed to create task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
