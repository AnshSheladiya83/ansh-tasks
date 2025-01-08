// models/Task.js
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    taskNumber: { type: Number, required: true, unique: true }, // Task number field
  },
  { timestamps: true }
);

// Ensure taskNumber increments sequentially
TaskSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastTask = await mongoose.models.Task.findOne().sort({
      taskNumber: -1,
    });
    this.taskNumber = lastTask ? lastTask.taskNumber + 1 : 1; // Increment taskNumber
  }
  next();
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
