import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { startOfMonth, addMonths, eachDayOfInterval, format, isSameMonth } from 'date-fns';
import { Card } from '@/components/ui/card';
import { CalendarDay } from '@/components/training/CalendarDay';
import { ViewToggle } from '@/components/training/ViewToggle';
import { MonthNavigation } from '@/components/training/MonthNavigation';
import { ExportButton } from '@/components/training/ExportButton';
import { PrintButton } from '@/components/training/PrintButton';
import { useTrainingData } from '@/lib/training-data';
import type { TrainingDay, CompletionState } from '@/lib/types';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "three-months">("month");
  const [completionState, setCompletionState] = useState<CompletionState>({});
  const { fetchTrainingData } = useTrainingData();
  
  const { data: trainingDays } = useQuery<TrainingDay[]>({
    queryKey: ['training-data'],
    queryFn: fetchTrainingData
  });

  useEffect(() => {
    const saved = localStorage.getItem('completionState');
    if (saved) {
      setCompletionState(JSON.parse(saved));
    }
  }, []);

  const handleToggleCompletion = (date: string, completed: boolean) => {
    const newState = { ...completionState, [date]: completed };
    setCompletionState(newState);
    localStorage.setItem('completionState', JSON.stringify(newState));
  };

  const handleNavigate = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const months = direction === "next" ? 1 : -1;
      return addMonths(prev, months);
    });
  };

  const getMonthDays = (baseDate: Date) => {
    const start = startOfMonth(baseDate);
    const end = addMonths(start, view === "month" ? 1 : 3);
    
    return eachDayOfInterval({ start, end }).map(date => {
      const dateStr = format(date, 'M/d/yyyy');
      const training = trainingDays?.find(t => t.date === dateStr);
      return {
        date,
        training,
        isCurrentMonth: isSameMonth(date, currentDate)
      };
    });
  };

  const days = getMonthDays(currentDate);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6 flex justify-between items-center print:mb-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Marathon Training Calendar
        </h1>
        <div className="flex items-center gap-4 print:hidden">
          {trainingDays && (
            <>
              <ExportButton 
                trainingDays={trainingDays} 
                completionState={completionState}
              />
              <PrintButton
                trainingDays={trainingDays}
                completionState={completionState}
              />
            </>
          )}
          <ViewToggle view={view} onViewChange={setView} />
        </div>
      </div>

      <Card className="p-6 print:p-2 print:shadow-none">
        <MonthNavigation
          currentDate={currentDate}
          onNavigate={handleNavigate}
          view={view}
        />

        <div className="grid grid-cols-7 gap-2 mb-2 print:gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 calendar-grid">
          {days.map(({ date, training, isCurrentMonth }) => (
            <div
              key={date.toISOString()}
              className={`${!isCurrentMonth && 'opacity-50'}`}
            >
              <CalendarDay
                date={date}
                trainingDay={training || null}
                isCompleted={completionState[format(date, 'M/d/yyyy')] || false}
                onToggleCompletion={handleToggleCompletion}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
