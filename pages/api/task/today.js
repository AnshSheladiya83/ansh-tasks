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
        // Get today's date range
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Set to 00:00:00 for start of today
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); // Set to 23:59:59 for end of today

        // Fetch tasks created today
        const tasksToday = await Task.find({
          createdAt: { $gte: todayStart, $lte: todayEnd },
        });

        res
          .status(200)
          .json({ todayTasks: tasksToday, totalTasks: tasksToday.length });
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch today's tasks" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
