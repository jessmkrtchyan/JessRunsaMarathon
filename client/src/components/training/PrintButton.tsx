import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { TrainingDay } from "@/lib/types";
import { format } from "date-fns";

interface PrintButtonProps {
  trainingDays: TrainingDay[];
  completionState: { [date: string]: boolean };
}

export function PrintButton({ trainingDays, completionState }: PrintButtonProps) {
  const handlePrint = () => {
    // Add print-specific class to body before printing
    document.body.classList.add('print-mode');
    window.print();
    // Remove print-specific class after printing
    document.body.classList.remove('print-mode');
  };

  return (
    <Button
      onClick={handlePrint}
      variant="outline"
      className="flex items-center gap-2 print:hidden"
    >
      <Printer className="h-4 w-4" />
      Print Calendar
    </Button>
  );
}
