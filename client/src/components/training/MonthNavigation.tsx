import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface MonthNavigationProps {
  currentDate: Date;
  onNavigate: (direction: "prev" | "next") => void;
  view: "month" | "three-months";
}

export function MonthNavigation({ currentDate, onNavigate, view }: MonthNavigationProps) {
  const getDisplayText = () => {
    if (view === "month") {
      return format(currentDate, "MMMM yyyy");
    }
    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() + 2);
    return `${format(currentDate, "MMM yyyy")} - ${format(endDate, "MMM yyyy")}`;
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onNavigate("prev")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <h2 className="text-xl font-semibold">
        {getDisplayText()}
      </h2>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onNavigate("next")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
