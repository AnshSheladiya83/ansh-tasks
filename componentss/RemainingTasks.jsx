// components/RemainingTasks.js
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const RemainingTasks = ({ tasks }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-800">
          Remaining Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length > 1 ? (
          <ScrollArea className="h-60 w-full rounded-md">
            <ul className="space-y-3">
              {tasks.slice(1).map((task, index) => (
                <li
                  key={task._id || index}
                  className="p-3 bg-gray-100 rounded-lg text-gray-700 border border-gray-300"
                >
                  {task.name}
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p className="text-gray-500 mt-3">No remaining tasks</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RemainingTasks;
