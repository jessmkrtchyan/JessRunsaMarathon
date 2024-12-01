import { TrainingDay } from './types';

export const parseTrainingData = (csvData: string): TrainingDay[] => {
  const lines = csvData.split('\n').slice(1); // Skip header
  return lines
    .filter(line => line.trim())
    .map(line => {
      const [date, day, steps, milesToJog] = line.split(',').map(s => s.trim());
      return {
        date,
        day,
        steps,
        milesToJog: milesToJog || '',
        isOptional: day?.includes('Optional') || false
      };
    })
    .filter(day => day.date); // Filter out empty rows
};

export const useTrainingData = () => {
  const fetchTrainingData = async () => {
    const response = await fetch('/api/training-data');
    const data = await response.text();
    return parseTrainingData(data);
  };

  return { fetchTrainingData };
};
