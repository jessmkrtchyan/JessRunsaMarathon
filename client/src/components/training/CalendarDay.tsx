import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { TrainingDay } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CalendarDayProps {
  trainingDay: TrainingDay | null;
  date: Date;
  isCompleted: boolean;
  onToggleCompletion: (date: string, completed: boolean) => void;
}

export function CalendarDay({ trainingDay, date, isCompleted, onToggleCompletion }: CalendarDayProps) {
  if (!trainingDay) {
    return (
      <Card className="h-24 p-2 bg-gray-50">
        <div className="text-sm text-gray-400">{date.getDate()}</div>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "h-24 p-2 transition-colors",
        isCompleted && "bg-green-50",
        trainingDay.isOptional && "border-yellow-200",
        "hover:shadow-md"
      )}
    >
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium">{date.getDate()}</span>
        <Checkbox
          checked={isCompleted}
          onCheckedChange={(checked) => {
            onToggleCompletion(trainingDay.date, checked as boolean);
          }}
        />
      </div>
      
      {trainingDay.milesToJog && (
        <div className="text-sm font-semibold text-green-700 mt-1">
          {trainingDay.milesToJog} miles
        </div>
      )}
      
      <div className="text-xs text-gray-600 mt-1">
        {trainingDay.steps}
      </div>
      
      {trainingDay.isOptional && (
        <div className="text-xs text-yellow-600 mt-1">
          Optional
        </div>
      )}
    </Card>
  );
}
