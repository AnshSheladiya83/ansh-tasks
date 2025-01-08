// pages/api/task/[id].js
import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";
import cors from "micro-cors";
const corsMiddleware = cors();
export default async function handler(req, res) {
  await corsMiddleware(req, res);
  await connectToDatabase();

  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch task" });
      }
      break;

    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
      } catch (error) {
        res.status(400).json({ message: "Failed to update task" });
      }
      break;

    case "DELETE":
      try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "Task deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Failed to delete task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
