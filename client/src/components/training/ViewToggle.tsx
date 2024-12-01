import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ViewToggleProps {
  view: "month" | "three-months";
  onViewChange: (view: "month" | "three-months") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <ToggleGroup type="single" value={view} onValueChange={(v) => onViewChange(v as "month" | "three-months")}>
      <ToggleGroupItem value="month" aria-label="Single Month View">
        Month
      </ToggleGroupItem>
      <ToggleGroupItem value="three-months" aria-label="Three Month View">
        3 Months
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
