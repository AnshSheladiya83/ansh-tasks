// components/RemainingTaskCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RemainingTaskCard = ({ remainingTasks }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Remaining Tasks to Reach Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-3xl text-[#000957] font-bold">
          {remainingTasks}
        </p>
      </CardContent>
    </Card>
  );
};

export default RemainingTaskCard;
