// components/CurrentTask.js
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CurrentTask = ({ task, completeTask }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Task</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-extrabold text-gradient bg-clip-text text-transparent bg-[#000957]">
          {task.name}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={completeTask}
          className="w-full mt-4 bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500"
        >
          Mark as Completed
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CurrentTask;
