// components/TotalTasksCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TotalTasksCard = ({ totalTasks }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="">Today's Total Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-3xl text-[#000957] font-bold ">{totalTasks}</p>
      </CardContent>
    </Card>
  );
};

export default TotalTasksCard;
