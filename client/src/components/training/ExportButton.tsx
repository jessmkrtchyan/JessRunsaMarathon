import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TrainingDay } from "@/lib/types";
import { format } from "date-fns";

interface ExportButtonProps {
  trainingDays: TrainingDay[];
  completionState: { [date: string]: boolean };
}

export function ExportButton({ trainingDays, completionState }: ExportButtonProps) {
  const handleExport = () => {
    // Create CSV content
    const headers = ["Date", "Day", "Steps", "Miles To Jog", "Completed"];
    const rows = trainingDays.map(day => [
      day.date,
      day.day,
      day.steps,
      day.milesToJog,
      completionState[day.date] ? "Yes" : "No"
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(","))
      .join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `training-progress-${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Export Progress
    </Button>
  );
}
