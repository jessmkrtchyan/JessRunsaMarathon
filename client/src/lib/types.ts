export interface TrainingDay {
  date: string;
  day: string;
  steps: string;
  milesToJog: string;
  isOptional: boolean;
}

export interface CompletionState {
  [date: string]: boolean;
}
