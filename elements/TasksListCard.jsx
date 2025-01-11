// components/TasksListCard.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FC } from "react";

const TasksListCard = ({ tasks }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-800">
          Today's Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <ScrollArea className="h-60 w-full rounded-md">
            {" "}
            <ul className="space-y-3 mt-4">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="p-3 bg-gray-100 rounded-lg text-gray-700 border border-gray-300"
                >
                  {task.name}
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p className="text-gray-500 mt-3">No tasks for today</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TasksListCard;
