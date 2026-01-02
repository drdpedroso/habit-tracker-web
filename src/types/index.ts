export interface Habit {
  id: number;
  name: string;
  emoji: string;
}

export interface Completions {
  [key: string]: boolean;
}

export interface HabitProgress {
  completed: number;
  total: number;
  percent: number;
}
