"use client";

import type { Habit, HabitProgress } from "@/types";
import { HabitCard } from "./HabitCard";

interface ListViewProps {
  habits: Habit[];
  days: number[];
  currentMonth: number;
  currentYear: number;
  isCompleted: (habitId: number, day: number) => boolean;
  toggleCompletion: (habitId: number, day: number) => void;
  getHabitProgress: (habitId: number) => HabitProgress;
  onRemoveHabit: (habitId: number) => void;
}

export function ListView({
  habits,
  days,
  currentMonth,
  currentYear,
  isCompleted,
  toggleCompletion,
  getHabitProgress,
  onRemoveHabit,
}: ListViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          days={days}
          currentMonth={currentMonth}
          currentYear={currentYear}
          progress={getHabitProgress(habit.id)}
          isCompleted={isCompleted}
          toggleCompletion={toggleCompletion}
          onRemove={() => onRemoveHabit(habit.id)}
        />
      ))}
    </div>
  );
}
